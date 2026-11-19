# How DNS works

Computers find each other by number, like 93.184.216.34, but people prefer names like example.com. DNS (Domain Name System) is the lookup service that turns names into numbers.

When you type a name, your computer asks a resolver, a helper server usually run by your internet provider. The resolver checks a chain of servers: first those that handle the ending, such as ".com", then those that hold the exact name's entry, called a record. The record gives the number, and your browser connects to it.

Answers are remembered, a practice called caching, so repeat visits skip the chain. Each record has an expiry time, so changes eventually spread.

Things usually go wrong when a record is outdated, misspelled, or its server is down. Then the name fails to resolve, even though the site itself is fine.
