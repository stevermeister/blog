---
title: "Angular: $scope.$on() - listen to several events"
tags: "$scope.$on,AngularJs,javascript,Хочу сделать мир лучше"
date: "2015-06-07"
---

I found it quite strange that AngularJS does not have possibility to watch several Angular-events, i.e.:

[javascript] $scope.$on(['user.login', 'user.logout'], callback); [/javascript]

and I decided to extend $on method, to make it handle such case:

[javascript] var $onOrigin = $rootScope.$on; $rootScope.$on = function(names, listener) { var self = this;

if (!angular.isArray(names)) { names = [names]; }

names.forEach(function(name) { $onOrigin.call(self, name, listener); });

}; [/javascript]

Sandbox for this code you can find [here](https://jsfiddle.net/STEVER/h6u92pe8/).
