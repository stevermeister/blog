---
title: "Специфика тестирования AngularJs директив"
tags: "AngularJs,directive,javascript,tests,Хочу сделать мир лучше"
date: "2014-06-11"
---

Тезисно выкладываю некоторые ключевые моменты по тестированию AngularJS директив.

## Подготовительные действия

- ставим тест-драйвер [Karma](http://karma-runner.github.io/0.12/index.html)
- определяемся и подключаем к проекту тест-фреймворк (варианты [Mocha](http://visionmedia.github.io/mocha/), [Jasmine](http://jasmine.github.io/))
- подключаем к проекту вспомогательную библиотеку [angular-mocks](https://github.com/angular/bower-angular-mocks)

## Написание сценария

подключаем Angular-модуль:

\[javascript\]beforeEach(module('myapp'));\[/javascript\]

подключаем шаблон (предварительно скомпилированный с помощью [html2js](https://github.com/karlgoldstein/grunt-html2js)):

\[javascript\]beforeEach(module('path/to/template'));\[/javascript\]

инжектим сервисы:

\[javascript\] var $timeout, $rootScope; beforeEach(inject(function(\_$timeout\_, \_$rootScope\_){ $timeout = \_$timeout\_; $rootScope= \_$rootScope\_; }));\[/javascript\]

прошу обратить внимание на нижнее подчеркивание, которое используется в Ангуляре для удобства и инжектит одноименный сервис.

либо инжектим инжектор и с помощью него уже получаем сервисы:

\[javascript\] var $timeout, $rootScope; beforeEach(inject(function($injector){ $timeout = $injector.get('$timeout'); $rootScope= $injector.get('$rootScope'); }));\[/javascript\]

для создания нового $scope делаем:

\[javascript\] var $scope = $rootScope.$new() \[/javascript\]

компиляция директивы для тестирования:

\[javascript\] var element = $compile('<my-directive></my-directive>')($scope); \[/javascript\]

при этом не забываем инжектить сервис $compile

получение изолированного $scope:

\[javascript\] var isolatedScope = element.children().scope() \[/javascript\]

либо (работает начиная с версии 1.2):

\[javascript\] var isolatedScope = element.isolateScope() \[/javascript\]

чтобы запустить все колбэки в таймАут-сервисах:

\[javascript\] $timeout.flush() \[/javascript\]

чтобы промисы внутри приложения отрезолвились необходимо вручную делать:

\[javascript\] scope.$apply(); \[/javascript\]

если что-то забыл - пиши в комментариях - дополню.

**UPD:**

подмена сервисов (замена мок-вариатом): \[javascript\] beforeEach(module(function ($provide){ $provide.service('SameNameWithRealService', function(){ //код вашего мок-сервиса }); })); \[/javascript\]

использование "шпионов" для проверки вызова методов: \[javascript\] //переопределение внутреннего метода $scope.someMethod = sinon.spy(); //вызов внешнего метода, который должен вызвать первый $scope.someOtherMethod() //проверка expect($scope.someMethod.called).equal(true); \[/javascript\]
