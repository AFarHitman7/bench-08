# Where Names Become Places

DNS (the system that turns typed names into computer locations) exists because people remember words while computers connect using numbers.

When you type an address (the words you enter, such as example.com) your browser (the program that shows web pages) asks a resolver (a helper computer that already knows where to start looking) for the matching number. That helper checks with the computers in charge of each part of the name until one returns the current number. Your browser then contacts that number and the page appears.

Answers are remembered for a set lifetime (a short reuse period) so repeat visits skip the search and load faster.

Most failures are simple: a mistyped name or the helper being briefly unreachable.
