---
title: "AngularJS: {{ }} vs ng-bind"
tags: "AngularJs,ng-bind,performance,Хочу сделать мир лучше"
date: "2015-11-01"
---

I was just curious about [this](https://stackoverflow.com/q/16125872/274500) discussion on stackoverflow and decided to do own test:

\[javascript\] for(var i = 0; i &lt; 100000; i++){ randomKey = randomString(); bigScope1\[randomKey\] = randomString(); bigScope2\[randomKey\] = randomString(); bigNgBindTempalte += '<div class="' + randomString() + '" ng-bind="'+ randomKey + '"></div>'; bigExpressionTemplate += '<div class="' + randomString() + '">{{' + randomKey + '}}</div>'; } // console.time('ngBind'); // $compile('<div>' + bigNgBindTempalte + '</div>')(bigScope1); // console.timeEnd('ngBind'); console.time('expression'); $compile('<div>' + bigExpressionTemplate + '</div>')(bigScope2); console.timeEnd('expression'); \[/javascript\]

[code](https://plnkr.co/edit/dlL7tpHG2OzstYMxGZWS?p=preview).

and indeed **ngBind** is faster,my machine for 100000 iterations shows:

ngBind: 46984.981ms
expression: 51107.555ms

It's still not clear why the result are so weird when you run it together (one by one). But it's another question.
