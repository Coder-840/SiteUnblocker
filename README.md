# Site Unblocker
A clever JS script that uses [Cloudflare Workers](https://workers.cloudflare.com) to unblock sites.
---
### How to use:
Copy the script. <br>
Go to [Cloudflare Workers](https://workers.cloudflare.com). <br>
Make an account if you don't have one. <br>
Create a new worker, give any name you want. <br>
Choose "Hello World" as the template.
Go into the code of your project.
Paste the code into the workers.js file which should be the only file there. <br>
Replace "target-site.com" at the top with the URL you want. (DO NOT INCLUDE THE HTTPS:// PART)
Hit "Deploy". <br>
Copy the worker URL. <br>
Now you and anyone with the URL can access the site. <br>
---
## WARNING: MAY NOT WORK WITH ALL SITES, AS IT IS JUST A SIMPLE FETCHER/PROXY.
