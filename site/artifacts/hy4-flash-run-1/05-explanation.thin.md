# How DNS Works

Think of the internet as a giant city. Every website lives at a specific address called an **IP address** (like `192.168.1.1`), but humans prefer names like `google.com`.

**DNS** (Domain Name System) is the internet's phone book. When you type a website name, your computer asks a DNS server: "What IP address matches this name?"

The lookup happens in steps:

- Your device checks its own memory cache first.
- It asks a **resolver**, usually run by your internet provider.
- The resolver asks **root servers**, which point to **top-level domain** servers (`.com`, `.org`).
- Those point to the site's **authoritative server**, which gives the final IP.

Your browser then connects to that IP and loads the page. All of this happens in milliseconds, invisibly, every time you visit a site.