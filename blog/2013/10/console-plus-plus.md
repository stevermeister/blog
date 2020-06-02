---
title: "Userscript console++"
tags: "browser,console,javascript,Хочу сделать мир лучше"
date: "2013-10-29"
---

I've created userscript to extend browser console.

Basic options:

- own **console object** with all methods to prevent errors in **old browsers**
- using console without context (we can pass **console.log** as a **callback**, and no "Illegal invocation" error will be shown)
- **production param** (debug information only for dev environment )
- **time** and **timeEnd** methods (if they are not exist)
- **log** alias for **console.log**

[Download/install console++](http://userscripts-mirror.org/scripts/show/181073 "userscripts.org").

sources of inspiration:

- https://github.com/theshock/console-cap
- [Log() - a Lightweight Wrapper for console.log](http://www.paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/ "paulirish")
- http://habrahabr.ru/post/116852/
