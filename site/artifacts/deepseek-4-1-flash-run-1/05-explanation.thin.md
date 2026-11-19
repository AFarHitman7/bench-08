# How DNS Works

Every website has an address made of numbers, like `142.250.72.14`. Computers need that number to find the server. People are bad at remembering numbers, so we give them names: `google.com`.

DNS is the system that turns a name into a number, automatically, in milliseconds. It works like a contacts app for the whole internet.

When you type a name, your computer asks a resolver — usually run by your internet provider or a company like Cloudflare. If the resolver doesn't already know the answer, it asks further up the chain: the root servers, then the servers for `.com`, then the servers for the site itself. Someone finally answers with the number, and it's cached so the next request is instant.

Think of it as directory assistance: you know the name, not the number, and something looks it up for you.