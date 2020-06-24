---
title: "AngularJS external links"
tags: "AngularJs,javascript,Хочу сделать мир лучше"
date: "2015-05-05"
---

I found it was not very obvious how to have **external link** that coincides with you application base.

For example you have application on `https://somedomain.com` and on `https://somedomain.com/admin` you have another application. And even with `href` (not `ng-href`) and the absolute path your second application will be not accessible by link from first one. The router will keep you inside application.

The only way to solve it is to use `href` together with `target="_self"` attribute:

\[javascript\] <a href="/admin" target="\_self">Admin</a> \[/javascript\]

And yes, this option is [documented](https://docs.angularjs.org/guide/$location), but why it's so hard to find?
