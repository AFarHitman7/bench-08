# DNS: The Internet's Address Book

Every website lives at a number called an IP address, like `142.250.72.14`. Nobody wants to memorize those, so we use names like `google.com`.

DNS translates names into numbers.

1. You type `google.com`.
2. Your computer asks a DNS resolver: "What's the address?"
3. If it doesn't know, it asks down a chain: root servers, then `.com` servers, then Google's own servers.
4. It gets back the correct IP address and saves it for next time.
5. Your browser connects to that number and loads the site.

It all happens in milliseconds — you just see the website appear.
