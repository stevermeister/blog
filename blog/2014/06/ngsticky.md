---
title: "ngSticky - атрибут директива для позиционирования панелей управления"
tags: "AngularJs,javascript,ngSticky,Хочу сделать мир лучше"
date: "2014-06-14"
---

Вдохновленный [angular-sticky](https://github.com/mattosborn/angular-sticky) написал свой  [ngSticky](https://gist.github.com/stevermeister/ec4c7da12deaf8e86469 "gist") вариант:

[javascript] angular.module('ui') .directive('ngSticky', function($window) { return function($scope, element) { var start, $win = element($window);

$win.on('scroll', function() {

var scroll = $win.scrollTop();

start = start || element.offset().top;

if (scroll > start) { element.addClass('stuck'); } else { element.removeClass('stuck'); } });

$win.on('resize', function recheckPositions() { element.width( element.parent().width() ); });

}; }); [/javascript]

CSS:

[css] .stuck { position: fixed; top: 0; } [/css]
