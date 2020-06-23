---
title: "Story about AngularJS, IE9 and CORS"
tags: "AngularJs,CORS,ie,ie9,javascript,Хочу сделать мир лучше"
date: "2014-09-15"
---

Using **AngularJS** with **Restangular** we suddenly found that for **IE9** we have fatal error "_Access denied_". It was **[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing "wiki")** issue. We'd tried several solutions but only this [xdomain](https://github.com/jpillora/xdomain "github") script helped.

remark: it works only for case when "slave"/requested domain is under your control: where you could put "proxy.html" file.
