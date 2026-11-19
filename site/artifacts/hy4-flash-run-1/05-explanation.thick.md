# DNS: How a Name Becomes a Page

Computers reach each other using numbers, but people prefer names. DNS is the system that turns a name you type into the number a computer needs.

When you enter an address, your device asks a resolver, a helper that hunts for answers. The resolver checks nearby, then asks a series of directory servers, each knowing one piece of the name, until it finds the right number and hands it back. Your browser then connects to that number and the page appears.

Answers are kept briefly in a cache, a short-term memory, so the next visit skips the hunt.

Trouble usually means a typo, a stale cache, or the directory servers being unreachable.