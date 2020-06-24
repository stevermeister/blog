---
title: "setTimeout + ES6 Promise"
tags: "es6,promise,setTimeout,Хочу сделать мир лучше"
date: "2016-09-10"
---

I'm just thinking how convenient could it be if we have setTimeout returning promise.

\[javascript\] setTimeout(1000).then(/\* ... do whatever \*/); \[/javascript\]

Let's create our own one and call it 'delay' (using ES6 Promise):

\[javascript\] delay = ms => new Promise(resolve => setTimeout(resolve, ms)); \[/javascript\]

so now we already can use our delay function:

\[javascript\] delay(1000).then(/\* ... do whatever \*/); \[/javascript\]

but let's not forget about promise cancelation, in this case we need to store reject and timeout id:

\[javascript\] delay = ms => { var promiseCancel, promise = new Promise((resolve, reject) => { let timeoutId = setTimeout(resolve, ms); promiseCancel = () => { clearTimeout(timeoutId); reject(Error("Cancelled")); } }); promise.cancel = () => { promiseCancel(); }; return promise; } \[/javascript\]

[Plunker](https://plnkr.co/edit/TeqWpQmj6QD6KlajEc5Z?p=preview) to play with this code.

[Stackoverflow discussion](https://stackoverflow.com/a/34255423/274500).
