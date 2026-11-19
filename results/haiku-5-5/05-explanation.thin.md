# How DNS Works

Computers find each other using numbers called IP addresses, like `142.250.80.46`. Humans prefer names like `google.com`. **DNS (Domain Name System)** is the internet's phone book that translates names into numbers.

When you type a name into your browser, your computer asks a **DNS resolver** (usually run by your internet provider or a company like Google or Cloudflare) for the matching address. If the resolver doesn't already know it, it asks a chain of authoritative servers: first the root servers, then the server for the domain's extension (like `.com`), and finally the server that holds the domain's actual records.

The answer comes back as an IP address, which your computer caches for a while so the next lookup is faster. Then your browser connects to that address and loads the page.
