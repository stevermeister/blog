---
title: "Keep an eye on AngularJS perfomance with ng-stats"
tags: "$digest,$watch,AngularJs,ng-stats,snippet,tool,Uncategorized,Рекомендую"
date: "2015-10-22"
---

[![ng-stats](images/Screenshot-2015-10-22-20.00.42.png)](https://github.com/kentcdodds/ng-stats)

[ng-stats](https://github.com/kentcdodds/ng-stats) is nice utility from [Kent C. Dodds](https://github.com/kentcdodds) that allows you to see statistics for your page's angular digest/watches.

to install just put this code into your bookmarks:

[javascript] javascript: (function() {var a = document.createElement("script");a.src = "https://rawgithub.com/kentcdodds/ng-stats/master/dist/ng-stats.js";a.onload=function(){window.showAngularStats()};document.head.appendChild(a)})(); [/javascript]
