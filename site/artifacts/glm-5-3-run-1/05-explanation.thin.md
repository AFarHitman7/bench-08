# How DNS Works

When you type a website name like `example.com`, your computer doesn't actually know where that site lives. Computers find each other using numeric addresses (IP addresses, like `93.184.216.34`), not names.

DNS — the **Domain Name System** — is the internet's phone book. It translates human-friendly names into machine-friendly numbers.

Here's the journey when you visit a site:

1. **Your device** asks a DNS resolver (usually run by your internet provider or a service like Google's) for the address.
2. **The resolver** asks a chain of servers: first a root server (which points the way), then a server managing `.com` addresses, then the site's own DNS server.
3. **That server replies** with the IP address.
4. **Your computer connects** to that address and loads the page.

The answer is cached, so next time it's instant. All of this happens in milliseconds.
