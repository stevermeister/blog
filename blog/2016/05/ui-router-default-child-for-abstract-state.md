---
title: "ui-router: Default child for abstract state"
tags: "AngularJs,javascript,ui-router"
date: "2016-05-28"
---

In version **1.0.0alpha0** they finally make it possible! Child for abstract states? No! But now at least it's possible to create own fix for it due to new **$transitionsProvider**, in which you could define **onBefore** hook. You can change the behaviour depends on state options. Let's use "abstract" property that is boolean and extend it: to make it possible to add child state here:

```javascript 
  $transitionsProvider.onBefore({ to: state => !!state.abstract }, ($transition$, $state) => { if (angular.isString($transition.to().abstract)) { return $state.target($transition.to().abstract); } });  
 ```

basically if abstract param is a string we set it like a target. Example of use:

```javascript 
  .state({ name: 'abstract2', url: '/abstract2', abstract: 'abstract2.foo', // redirect to 'abstract2.foo' template: 'abstract2' })  
 ```

to cover more complex case we could set it like a function:

```javascript 
  $transitionsProvider.onBefore({ to: state => !!state.abstract }, ($transition$, $state, $injector) => { if (angular.isFunction($transition.to().abstract)) { return $state.target($injector.invoke($transition.to().abstract)) } });  
 ```

and an example for an abstract state with child that is defined by function:

```javascript 
  .state({ name: 'abstract3', url: '/abstract3', abstract: function() { return 'abstract3.foo' }, // Function redirect template: 'abstract3' })  
 ```

All code for experiments is available on [plunker](https://plnkr.co/edit/vOJlRv9V7fX9G8TNqfKf?p=preview).
