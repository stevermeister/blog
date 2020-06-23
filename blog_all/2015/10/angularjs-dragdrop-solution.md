---
title: "AngularJS drag&drop solution"
tags: "angular-dragula,AngularJs,drag&amp;drop,Рекомендую"
date: "2015-10-23"
---

[![dragula](images/Screenshot-2015-10-23-08.56.59.png)](http://bevacqua.github.io/angular-dragula/)

[Dragula](http://bevacqua.github.io/dragula/) is a light weight library(or module) for applying drag&drop functionality on you application. There is also an official AngularJS adapter for it - [angular-dragula](http://bevacqua.github.io/angular-dragula/).

It has quite strange module dependancy declaration:

\[javascript\] var app = angular.module('my-app', \[angularDragula(angular)\]); \[/javascript\]

so I put an [example on plunker](http://plnkr.co/edit/2dfiXb?p=preview) to make it easy for you to start.
