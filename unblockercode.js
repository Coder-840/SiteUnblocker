const targetDomain = "target-site.com";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const proxyUrl = new URL(request.url);
    
    // Direct all requests to the target domain while keeping the path
    proxyUrl.hostname = targetDomain;
    proxyUrl.protocol = "https:";

    // Prepare the proxy request with original headers
    const modifiedRequest = new Request(proxyUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow"
    });

    // Fix headers to prevent the target site from blocking the proxy
    modifiedRequest.headers.set("Origin", `https://${targetDomain}`);
    modifiedRequest.headers.set("Referer", `https://${targetDomain}/`);

    const response = await fetch(modifiedRequest);
    const contentType = response.headers.get("Content-Type") || "";

    // If it's HTML, rewrite links so they don't break
    if (contentType.includes("text/html")) {
      return new HTMLRewriter()
        .on("a", new AttributeRewriter("href", url.hostname))
        .on("img", new AttributeRewriter("src", url.hostname))
        .on("link", new AttributeRewriter("href", url.hostname))
        .on("script", new AttributeRewriter("src", url.hostname))
        .transform(response);
    }

    return response;
  }
};

// Helper class to rewrite attributes (like src and href) to use your proxy URL
class AttributeRewriter {
  constructor(attributeName, proxyHostname) {
    this.attributeName = attributeName;
    this.proxyHostname = proxyHostname;
  }
  element(element) {
    const attribute = element.getAttribute(this.attributeName);
    if (attribute) {
      // Replaces the original domain with your worker's domain in the HTML
      element.setAttribute(
        this.attributeName,
        attribute.replace(targetDomain, this.proxyHostname)
      );
    }
  }
}
