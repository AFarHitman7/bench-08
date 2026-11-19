# How DNS works

DNS (the Domain Name System) is the internet's way of turning names into numbers. Every website lives at a numeric address, called an IP address, like 172.217.14.206. People remember names; computers need the numbers.

When you type an address, your computer asks a DNS server (a lookup computer, usually run by your internet provider) for the number matching that name. The answer comes back, your computer uses it to fetch the page, and the page appears.

That answer is remembered, in a cache (a saved copy of recent answers), so your next visit skips the question and loads faster.

When something goes wrong, usually the lookup fails: the DNS server can't be reached, or a remembered answer has gone stale. Your browser then reports it can't find the site, even though the site itself is fine.
