# How DNS Works

Computers find each other using numbers called IP addresses, like `93.184.216.34`. People prefer names like `example.com`. DNS, the Domain Name System, is the phone book that translates one into the other.

When you type a website name, your computer asks a DNS resolver, usually run by your internet provider or a service like Google or Cloudflare. If the resolver doesn't already know the answer, it asks a chain of servers: first a root server, which points to the right top-level server (for `.com`), which points to the server that holds the site's own records. That final server replies with the IP address.

Your computer then connects to that address and loads the page. The answer is cached for a set time, so the next lookup is much faster.
