---
title: "Understanding of component/directive attribute binding types"
tags: "AngularJs,angularjs-component,angularjs-directive"
date: "2016-02-23"
---

You probably know that directive component can have 4 different attribute-scope bindings:

- "**@**" - bind a local scope property to the value of DOM attribute
- "**\=**" - set up a bidirectional binding between a local scope property and an expression passed via the attribute (also for collection "**\=\***" and "**\=?"** if attribute is optional)
- "**<**" - set up a one-way (one-directional) binding between a local scope property and an expression passed via the attribute
- "**&**" - provides a way to execute an expression in the context of the parent scope

So I decided to uncover magic of this symbols and recreate their functionality by using attributes from the link function.

Let's take an example of a directive with all binding types:

```javascript 
  app.directive('myDir', function() { return { scope: { x: '@', y: '=', z: '<', f: '&' }, template }; });  
 ```

template could be something like this:

<div>{{x}} <input ng-model="x"></div>
<div>Hello {{y}}  <input ng-model="y"></div>
<div>Hello {{z}}  <input ng-model="z"></div>
<div>Hello {{f()}}  <input></div>

and integration is just:

<my-dir x="Hello {{name}}" y="name" z="name" f="getName()"></my-dir>

Now we will create directive without all this scope magic param notation, but with the same binding functionality, just by using attributes of link function:

<my-dir2 x="Hello{{name}}" y="name" z="name" f="getName()"></my-dir2>

and the definition:

```javascript 
  app.directive('myDir2', function($interpolate, $parse) { return { scope: {}, template, link: function(scope, element, attrs) {} }; });  
 ```

Inside the link function we will use **scope.$parent** - link to parent scope and **attrs** - directive attributes.

## @

Value binding is simple, only thing that we need to do is to observe attribute and update the value:

```javascript 
  attrs.$observe('x', value => scope.x = value);  
 ```

to have immediate access inside link function we should probably also add:

```javascript 
  scope.x = $interpolate(attrs.x)(scope.$parent);  
 ```

we are using [$interpolate](https://docs.angularjs.org/api/ng/service/$interpolate) service here that will parse expression that you put into you attribute( attrs.$observe will do it by default).

## <

One way binding. The same logic like we did for first one, only in this case we need to use **$watch** instead of $observe (now it's property, not attribute change) and [**$parse**](https://docs.angularjs.org/api/ng/service/$parse) instead of $interpolate(only one property not the expression):

```javascript 
  scope.$watch(() => $parse(attrs.z)(scope.$parent), newParentValue => scope.z = newParentValue);  
 ```

and again to make it accessible in link function:

```javascript 
  scope.z = $parse(attrs.z)(scope.$parent);  
 ```

## \=

Two-way binding. The most difficult one, because you need to synchronise value of the parent scope as well. Comparing to previous one you also need to store **lastValue** to understand which value has been updated: parent or directive one.

So first lest just try to parse the attribute:

```javascript 
  expressionFn = $parse(attrs.y);  
 ```

after we can get attribute value

```javascript 
  scope.y = expressionFn(scope.$parent)  
 ```

and store it like a lastValue:

```javascript 
  lastValue = scope.y;  
 ```

now we should setup a watcher to check whether something was changed:

```javascript 
  scope.$watch(() => { let parentValue = expressionFn(scope.$parent); if (angular.equals(parentValue, scope.y)) { return; } });  
 ```

so if parentValue and scope.y are the same we finish the function, but if not we need to synchronise either parent or directive scope. How to define whine one to synchronise? We will make comparison with lastValue:

```javascript 
  if (!angular.equals(parentValue, lastValue)) { scope.y = parentValue; }  
 ```

if they are not equal - we should sync directive scope property, otherwise - parent property. But how to do it? It could be done with help of special [assign](https://docs.angularjs.org/api/ng/service/$parse) method:

```javascript 
  expressionFn.assign(scope.$parent, parentValue = scope.y);  
 ```

And now all together:

[javascript] let expressionFn = $parse(attrs.y); let lastValue = scope.y = expressionFn(scope.$parent); scope.$watch(() => { let parentValue = expressionFn(scope.$parent); if (angular.equals(parentValue, scope.y)) { return; }

if (!angular.equals(parentValue, lastValue)) { scope.y = parentValue; } else { expressionFn.assign(scope.$parent, parentValue = scope.y); }

return lastValue = parentValue; }); [/javascript]

 

## &

Execute with parent scope context. Like a piece of cake:

```javascript 
  scope.f = (locals) => $parse(attrs.f)(scope.$parent, locals);  
 ```

 

All these examples were shown only to explain you what's happening inside Angular and you should not use **scope.$parent** instead of attribute binding notation.
