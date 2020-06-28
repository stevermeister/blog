---
title: "Snippet to visualise amount of watchers for each AngularJS scope"
tags: "AngularJs,javascript,scope,Хочу сделать мир лучше"
date: "2015-03-14"
---

![watchers-visualisation](images/Screenshot-2015-03-14-13.48.29.png)

I've created snippet to analyse how many watchers you have in your web app and on which elements they are placed.

Actually I just extended this [piece of code](https://ng.malsup.com/#!/counting-watchers "https://ng.malsup.com/#!/counting-watchers") and add overlay element visualisation, so now we have ([gist](https://gist.github.com/stevermeister/b161d31b0a41da78eafa "https://gist.github.com/stevermeister/b161d31b0a41da78eafa")):

[javascript] (function visualizeAngularWatchers() { var i, data, scope, count = 0, all = document.all, len = all.length, test = {}, overlayMain = angular.element('<div/>'); overlayMain.css({'z-index': 9999}); angular.element(document.body).append(overlayMain);

for (i = 0; i < len; i++) { data = angular.element(all[i]).data(); scope = data.$scope || data.$isolateScope; if (scope && scope.$$watchers) { if ( !test[ scope.$id ] ) { test[ scope.$id ] = true; count += scope.$$watchers.length; createOverlay(angular.element(all[i]), scope.$$watchers.length) } } }

function createOverlay(element, amount){ var persent = Math.pow(2, amount), over = angular.element('<div style="background:rgba(180,120,0,.' + persent + '); position:absolute;" />'); over.width(element.width()); over.height(element.height()); over.offset({ top: element.offset().top, left: element.offset().left}) overlayMain.append(over); } return count; })(); [/javascript]

and you can run it in console or create code-snippet for Chrome.
