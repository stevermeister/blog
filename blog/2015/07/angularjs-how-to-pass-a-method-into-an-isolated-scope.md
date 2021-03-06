---
title: "AngularJS: How to pass a method into an isolated scope"
tags: "AngularJs,directive,javascript"
date: "2015-07-29"
---

I came to conclusion that it's not very obvious how to pass a method into an isolated scope. And that's why my junior AngularJS developers just do direct call:

```javascript 
  $scope.$parent.methodOfParentScope();  
 ```

but it's more like a hack. It's more correct to pass it via attribute:

```html 
  <my-directive say="sayHello()"></my-directive>  
 ```

and inside directive:

```javascript 
  { say: '&' }  
 ```

and now you can use it in isolated scope:

```javascript 
  scope.say()  
 ```

And when you have method with param it's little bit more tricky.

For example you have a method in a parent scope:

```javascript 
  scope.sayHello = function(name){ //... }  
 ```

in this case you should also specify it in the attribute:

```html 
  <my-directive say="sayHello(name)"></my-directive>  
 ```

and for method call use specific format:

```javascript 
  scope.say({name: 'Alice'})  
 ```

Code is [here](https://jsfiddle.net/STEVER/j6eL82kk/).

Also highly recommend to watch episode from Egghead - [Isolate Scope "&"](https://egghead.io/lessons/angularjs-isolate-scope-expression-binding) .
