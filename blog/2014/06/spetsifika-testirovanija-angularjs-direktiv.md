---
title: "Специфика тестирования AngularJs директив"
tags: "AngularJs,directive,javascript,tests"
date: "2014-06-11"
slug: "специфика-тестирования-angularjs-директив"
---

Тезисно выкладываю некоторые ключевые моменты по тестированию AngularJS директив.

## Подготовительные действия

- ставим тест-драйвер [Karma](https://karma-runner.github.io/0.12/index.html)
- определяемся и подключаем к проекту тест-фреймворк (варианты [Mocha](https://visionmedia.github.io/mocha/), [Jasmine](https://jasmine.github.io/))
- подключаем к проекту вспомогательную библиотеку [angular-mocks](https://github.com/angular/bower-angular-mocks)

## Написание сценария

подключаем Angular-модуль:

```javascript 
 beforeEach(module('myapp')); 
 ```

подключаем шаблон (предварительно скомпилированный с помощью [html2js](https://github.com/karlgoldstein/grunt-html2js)):

```javascript 
 beforeEach(module('path/to/template')); 
 ```

инжектим сервисы:

```javascript 
  var $timeout, $rootScope; beforeEach(inject(function(_$timeout_, _$rootScope_){ $timeout = _$timeout_; $rootScope= _$rootScope_; })); 
 ```

прошу обратить внимание на нижнее подчеркивание, которое используется в Ангуляре для удобства и инжектит одноименный сервис.

либо инжектим инжектор и с помощью него уже получаем сервисы:

```javascript 
  var $timeout, $rootScope; beforeEach(inject(function($injector){ $timeout = $injector.get('$timeout'); $rootScope= $injector.get('$rootScope'); })); 
 ```

для создания нового $scope делаем:

```javascript 
  var $scope = $rootScope.$new()  
 ```

компиляция директивы для тестирования:

```javascript 
  var element = $compile('<my-directive></my-directive>')($scope);  
 ```

при этом не забываем инжектить сервис $compile

получение изолированного $scope:

```javascript 
  var isolatedScope = element.children().scope()  
 ```

либо (работает начиная с версии 1.2):

```javascript 
  var isolatedScope = element.isolateScope()  
 ```

чтобы запустить все колбэки в таймАут-сервисах:

```javascript 
  $timeout.flush()  
 ```

чтобы промисы внутри приложения отрезолвились необходимо вручную делать:

```javascript 
  scope.$apply();  
 ```

если что-то забыл - пиши в комментариях - дополню.

**UPD:**

подмена сервисов (замена мок-вариатом): ```javascript 
  beforeEach(module(function ($provide){ $provide.service('SameNameWithRealService', function(){ //код вашего мок-сервиса }); }));  
 ```

использование "шпионов" для проверки вызова методов: ```javascript 
  //переопределение внутреннего метода $scope.someMethod = sinon.spy(); //вызов внешнего метода, который должен вызвать первый $scope.someOtherMethod() //проверка expect($scope.someMethod.called).equal(true);  
 ```
