# How DNS Works

Computers find each other using numbers called IP addresses, like 142.250.72.14. Humans prefer names like example.com. DNS translates names to numbers.

When you type a web address:

1. Your computer asks a resolver, usually run by your internet provider.
2. If it recently looked up that name, it answers from memory.
3. Otherwise it asks around: the root directory, then the directory for `.com`, then the site's own directory.
4. That final directory gives the correct number.
5. Your computer uses it to connect.

The result is saved briefly, so the next visit is faster. All this happens in milliseconds.
