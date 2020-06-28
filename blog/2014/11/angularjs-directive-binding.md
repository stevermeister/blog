---
title: "AngularJS Directive attribute binding options"
tags: "AngularJs,directive,javascript,Хочу сделать мир лучше"
date: "2014-11-16"
---

This example explicitly shows the difference between directive attribute binding types. Let's say you have directive:

[javascript] function myDirective() { return { scope: { x: '@', // String, interpolated with {{ }} y: '=', // Expression z: '&' // Function } }; } [/javascript]

it means that you will do such operations with attributes to pass the directive:

[javascript] function MyDirectiveController($scope, $element, $attrs, $interpolate, $parse) { $attrs.$observe('x', function(value) {}); $interpolate($attrs.x)($scope); $scope.$eval($attrs.y); var fn = $parse($attrs.z); $element.on('click', function() { fn($scope); }); } [/javascript]
