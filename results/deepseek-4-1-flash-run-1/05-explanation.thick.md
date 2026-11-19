# How DNS works

Computers find each other by number, not by name. DNS (the domain name system) is the lookup service that turns a name you type, like example.com, into the number that locates it, its IP address.

Your browser asks your internet provider's resolver, a computer whose only job is to answer this question. The resolver asks other computers, each holding a slice of the list, until one returns the number. The browser then loads the page from that address.

Answers are cached (copied and kept) because names rarely change and repeating the whole search each time would be slow.

It usually fails when that saved copy expires and the server holding the real answer can't be reached, or your device is pointed at a broken resolver, giving you "DNS server not responding."

Think of a librarian who doesn't know the answer but knows which shelf to check.