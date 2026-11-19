# How DNS works

Computers find each other by numbers, such as 142.250.80.46, but people remember names like example.com. DNS, the Domain Name System, is the directory that turns a name into its number.

When you type a name, your computer first checks its own short-term memory, called a cache. If the answer is not there, it asks a resolver, a helper computer usually run by your internet provider. The resolver asks a root server, which points it to the server for the ending (such as .com), which points it to the server that holds the name's number.

Answers are kept for a set time, called the TTL (time to live), so repeat visits are fast.

Problems usually come from an outdated cache, a mistyped name, or a server that is down. A "DNS error" means the name could not be turned into a number.
