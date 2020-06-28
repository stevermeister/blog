---
title: "Angular + ES6 Promise"
tags: "AngularJs,es6,javascript,promise,Хочу сделать мир лучше"
date: "2016-09-12"
---

It would be really nice if we could use native **ECMAScript 2015** **Promises** with **Angular** instead of **$q** service that is provided from box to be close to pure JavaScript:

[javascript] //somewhere inside component controller let promise = new Promise((resolve) => setTimeout(() => resolve('resolved'), 2000)); promise.then(x => this.x = x); [/javascript]

But in this case we will have to run **digest** manually for each resolve(to synchronise view and model):

[javascript] let promise = new Promise((resolve) => setTimeout(() => resolve('resolved'), 2000)); promise.then(x => { $scope.apply(); this.x = x; }); [/javascript]

But what if we hack the **Promise** and intercept our **digest** call there:

[javascript] class SubPromise extends Promise { constructor(executor) { super(function(\_resolve, \_reject) { var resolve = (data) => { var res = \_resolve(data); angular.element(document.body).injector().get('$rootScope').$apply(); return res; } return executor(resolve, \_reject); }); } } [/javascript]

now we just need to overwrite standard **Promise**:

[javascript] window.Promise = SubPromise; [/javascript]

to keep it simple to cover for **unit-tests** you can also wrap it into an angular **factory**:

[javascript] factory('Promise', () => Promise); [/javascript]

[Here](https://plnkr.co/edit/fysuo9?p=preview) you can play with the code.

[Discussion on stackoverflow](https://stackoverflow.com/q/35971958/274500) about customising ES6 Promise.

**!Attention:** This experiment was made just for learning purposes and it should not be applied for the real projects.
