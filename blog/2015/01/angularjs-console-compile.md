---
title: "Компилируем AngularJS шаблоны в консоли"
tags: "$compile,AngularJs,console,javascript"
date: "2015-01-24"
---

В дополнение к [этой заметке](https://stepansuvorov.com/blog/2013/03/angularjs-%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B0%D0%B5%D0%BC-scopeinjectorcontroller-%D0%B8%D0%B7-dom/ "AngularJS: получаем scope/injector/controller из DOM") еще одна о том, как можно проверить работу шаблона/директивы/фильтра в консоли.

Для того, чтобы скомпилировать шаблон нам необходим **$compile** сервис, который можно получить с помощью инжектора:

```javascript 
  $injector = angular.element(document).injector(); $compile = $injector.get('$compile');  
 ```

также для компиляции нам нужен конкретный $scope:

```javascript 
  $scope = angular.element(document).scope();  
 ```

на вот теперь можно компилировать:

```javascript 
  var template = '{{price|currency}}'; var element = angular.element('<div>').append(template); //контейнер для шаблона $scope.price = 999999; //просто для теста $compile(element)($scope);  
 ```

и конечно же не забудем обновить дайджест:

```javascript 
  $scope.$apply();  
 ```

после чего можно доставать результат:

```javascript 
  element.html();  
 ```

Теперь все вместе и более в сжатой форме:

```javascript 
  (function(template){ var $ = angular.element, $0, $scope, $compile, $element; if(!$0) $0 = document; $scope = $($0).scope(); $compile = $(document).injector().get('$compile'); $element = $('<div/>').append(template); $compile($element)($scope); $scope.$apply(); return $element.html(); })('{{1000000|currency}}');  
 ```

 

Ну и при желании можно даже [кнопочку для браузера](https://jsbin.com/kepeji/1/watch?html,output "jsbin.com") сделать (просто перетащите кнопку в панель закладок и можете пользоваться везде).
