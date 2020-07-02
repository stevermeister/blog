---
title: "AngularJS: $scope.$unwatch и $scope.$off"
tags: "AngularJs,javascript"
date: "2013-07-26"
---

По непонятной причине в фреймворке не реализованы ни метод **$unwatch()**, ни метод **$off()** для снятия прослушивания объекта(**$watch()**)/события(**$on()**).

А для случая, когда нам нужно сделать "**unbind**", **Angular** предлагает (исходя из исходников) следующий способ:

var stopWatch = $scope.$watch('someObject', callback);
 stopWatch();

аналогично для $on:

 var stopListen = $scope.$on('someEvent', callback);
 stopListen();

Если необходимо выполнить обработчик только один раз(на подобие **jQuery.one()**), можно сделать так:

var stopWatch = $scope.$watch('someObject', function(){
 //some code here
 stopWatch();
});
