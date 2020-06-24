---
title: "Пишем свой Uploader с нуля на javascript используя FileApi. Часть5. +AngularJS"
tags: "AngularJs,fileApi,javascript,Хочу сделать мир лучше"
date: "2014-09-07"
---

В этой части хочу рассказать о том, как можно все эти операции с файлами завернуть в AngularJS.

Рекомендую пролистать предыдущие части перед началом разбора этой:

- [Часть 1](https://stepansuvorov.com/blog/2012/04/%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-%D1%81%D0%B2%D0%BE%D0%B9-uploader-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D0%BD%D0%B0-javascript-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-fileapi-%D1%87%D0%B0/)
- [Часть 2](https://stepansuvorov.com/blog/2012/06/%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-%D1%81%D0%B2%D0%BE%D0%B9-uploader-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D0%BD%D0%B0-javascript-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-fileapi-%D1%87%D0%B0-2/)
- [Часть 3](https://stepansuvorov.com/blog/2012/07/%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-%D1%81%D0%B2%D0%BE%D0%B9-uploader-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D0%BD%D0%B0-javascript-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-fileapi-%D1%87%D0%B0-3/)
- [Часть 4](https://stepansuvorov.com/blog/2012/07/%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-%D1%81%D0%B2%D0%BE%D0%B9-uploader-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D0%BD%D0%B0-javascript-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-fileapi-%D1%87%D0%B0-4/)

Разберем несколько ключевых поментов подключения FileApi к AngularJS:

- проблема ng-model и input file
- сервис для FileApi
- превью директива

## Проблема ng-model

Проблема заключается в том, что **ng-model** не работает с **input-file**, то есть он не обновит связанную модель, когда через компонент буду выбраны файлы.

Более подробно о проблеме можно почитать [тут](https://github.com/angular/angular.js/issues/1375 "github.com/angular/angular.js/issues/1375").

Приходиться писать свое решение - директиву расширяющую возможности ng-model для данного элемента. Что должна делать директива? Обновлять модель по событию **change** (это родное браузерное событие, которое нормально отрабатывает с **input-file**), то есть:

\[javascript\] directive('fileChanged', function() { return { restrict: 'A', link: function($scope, element) {

element.bind('change', function(event) { //... }); } }; }); \[/javascript\]

теперь нам нужно подгрузить модель, для этого используем свойство директивы **require**:

\[javascript\] directive('fileChanged', function() { return { restrict: 'A', require: '?ngModel', link: function($scope, element, attrs, ngModel) { if (!ngModel) { return; }

element.bind('change', function(event) { //... }); } }; }); \[/javascript\]

Используем "**?**" при загрузке, чтобы избежать ошибки(иметь возможность самим обработать) при отсутствии **ng-model** директивы на элементе. Зададим значение модели используя метод **$setViewValue** и обновим скоуп используя $scope.$apply:

\[javascript\] directive('fileChanged', function() { return { restrict: 'A', require: '?ngModel', link: function($scope, element, attrs, ngModel) { if (!ngModel) { return; }

element.bind('change', function(event) { ngModel.$setViewValue(event.target.files\[0\]); $scope.$apply(); }); } }; \[/javascript\]

И последний штрих - переопределим метод **$render** для **ngModel** на **angular.noop**, чтобы, когда мы обновляли значение модели, он не пытался ничего обновить во вью(мы сами контролируем этот процесс):

\[javascript\] directive('fileChanged', function() { return { restrict: 'A', require: '?ngModel', link: function($scope, element, attrs, ngModel) { if (!ngModel) { return; }

ngModel.$render = angular.noop;

element.bind('change', function(event) { ngModel.$setViewValue(event.target.files\[0\]); $scope.$apply(); }); } }; }); \[/javascript\]

[Пример полностью](https://jsfiddle.net/STEVER/gymbzmgo/ "jsfiddle.net").

## Сервис для FileApi

Так как работаем с **AngularJS**, то использовать **FileReader** напрямую не комильфо: необходимо создать **AngularJS**\-сервис, который будет оберткой над **window.FileReader**:

\[javascript\] factory('FileReader', function($window) {

if (!$window.FileReader) { throw new Error('Browser does not support FileReader'); }

function readAsDataUrl(file) { var reader = new $window.FileReader();

reader.onload = function() { //... };

reader.onerror = function() { //... };

reader.readAsDataURL(file);

return reader; }

return { readAsDataUrl: readAsDataUrl }; } \[/javascript\]

как-то так. Обязательно через $window, а не window, как минимум для того чтобы потом удобнее было покрывать юнит-тестами.

Так как операции работы с файлами у нас асинхронные, то без промисов нам не обойтись - добавляем $q:

\[javascript\] factory('FileReader', function($q, $window) {

if (!$window.FileReader) { throw new Error('Browser does not support FileReader'); }

function readAsDataUrl(file) { var deferred = $q.defer(), reader = new $window.FileReader();

reader.onload = function() { deferred.resolve(reader.result); };

reader.onerror = function() { deferred.reject(reader.error); };

reader.readAsDataURL(file);

return deferred.promise; }

return { readAsDataUrl: readAsDataUrl }; } \[/javascript\]

[Код](https://gist.github.com/stevermeister/b6008f4b6c7064336f85 "gist").

## Превью директива

Ну и в заключение для того, чтобы использовать только что написаный сервис **FileReader** сделаем директиву, которая будет отображать превью загруженной картинки. HTML-представление будет выглядеть где-то так:

\[javascript\] <input type="file" ng-model="newImage" file-changed /> <img file-preview="newImage" /> \[/javascript\]

- **file-changed** - ранее описанная директива-фикс **ng-model**
- **file-preview** - наша новая директива, которая будет отвечать за отобразжение превью при выборе файла через модель **newImage**

а код директивы:

\[javascript\] directive('filePreview', function (FileReader) { return { restrict: 'A', scope: { filePreview: '=' }, link: function (scope, element, attrs) { scope.$watch('filePreview', function (filePreview) { if (filePreview && Object.keys(filePreview).length !== 0) { FileReader.readAsDataUrl(filePreview).then(function (result) { element.attr('src', result); }); } }); } }; }); \[/javascript\]

**FileReader** - раннее созданный сервис оболочка на window.FileReader с промисами **filePreview: '='** - создаем изолированный скоуп и линкуем модель **scope.$watch('filePreview'** - отслеживаем изменение модели **FileReader.readAsDataUrl(filePreview)** - считываем файл **element.attr('src', result)** - задаем картинку

Поиграться с примером можно [тут](https://jsfiddle.net/STEVER/e8719c1j/ "jsfiddle.net").
