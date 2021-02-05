---
title: "AngularJS: получаем scope/injector/controller из DOM"
tags: "AngularJs,javascript"
date: "2013-03-14"
slug: "angularjs-получаем-scopeinjectorcontroller-из-dom"
---

Небольшая заметка о том, как достать **scope**, **injector** либо **controller** из элементов **DOM**. Делается это очень просто:

var scope = angular.element(domElement).scope()

var injector = angular.element(domElement).injector()

var controller = angular.element(domElement).controller()

**angular.element** - это алиас на расширенный **JQueryLite**. Т.е. можем свободно использовать селекторы.

При необходимости получить **rootScope** проделвываем теже действия только с элементом, который определен как корневой для **Angular**:

var rootScope = angular.element(domElement).scope()

чаще всего это **body**:

var rootScope = angular.element('body').scope()
