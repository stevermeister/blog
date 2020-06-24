---
title: "AngularJS и проверка данных формы"
tags: "AngularJs,form,html5,javascript,validation,Хочу сделать мир лучше"
date: "2015-06-14"
---

![AngularJS Validation](images/AngularJS-Shield-large.png)

Пост состоит из следующих частей:

- Проверка данных в HTML5
- AngularJS расширения для валидации
- Свои кастомные проверки данных на AngularJS
- Вывод сообщений об ошибках и ng-messages

 

## HTML5 валидация данных

В первую очередь следует отметить, что у тега `<form>` в HTML5 появился атрибут `novalidate`, который говорит браузеру, что форму валидировать не нужно.

Вспомогательные атрибуты проверки данных:

- **require** - говорит о том, что поле обязательно и должно быть заполнено
- **min/max** - характерно для элемента `input` и указывает граничные значения
- **maxlength** - для `input` и `textarea`, задает максимальное количество символов
- **type** - в поле типа мы можем указывать не только `text`, но так же такие значения как `email`, `url`, которые будут провалидированы стандартными правилами. Болле подробно о стандартах [тут](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation).
- **pattern** - позволяет задать регулярное выражение для проверки поля.

API для проверки данных:

- **checkValidity()** - метод, который есть, как у всей формы, так и у каждого элемента. Возвращает true/false.
- **willValidate** - свойство, false, когда элемент содержит невалидные данные
- **validity** - свойство, содержит объект экземпляр `[ValidityState](https://developer.mozilla.org/en-US/docs/DOM/ValidityState "DOM/ValidityState Interface")`
- **validationMessage** - содержит сообщение ошибки
- **setCustomValidity(message)** - позволяет задать сообщение ошибки

Поиграться с атрибутами проверки и API можно [тут](https://jsfiddle.net/STEVER/o6q4tp53/).

## AngularJS расширения для валидации

Ангуляр автоматически применяется к элементу формы, в текущий **$scope** будет добавлена ссылка на **[formCotroller](https://docs.angularjs.org/api/ng/type/form.FormController)**, ключом будет являться значение атрибута **name**. В нем мы можем найти ссылки на **[ngModelController](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController)** для всех элементов формы ( так же по  name). То есть, мы добавили в наше Ангуляр приложение форму:

\[html\] <form name=login> <input name="username"> <input name="password"> </form> \[/html\]

После чего в нашем скоуп будут:

\[javascript\] $scope.login // formController $scope.login.username //ngModelController $scope.login.password //ngModelController \[/javascript\]

И при этом каждый объект **formController** и **ngModelController** содержит следующие свойства (касательно валидации):

- **$valid** - true/false - валидности введенных данных относительно заданных правил
- **$invalid** - false/true - обратный к предыдущему
- **$pristine** - true, если форма/элемент еще не использовались
- **$dirty** - обратные к предыдущему
- **$touched** - на элементе произошло событие blur
- **$error** - объект ошибки
- **$isEmpty(value)** - вспомогательный метод, который проверяет является ли значение undefined, '', null или NaN
- **$validate()** - true/false - запускает все валидаторы зарегистрированные на модели
- **$setValidity(validationErrorKey, isValid)** - задание значения валидности для одного из критериев
- **$setPristine()**/**$setDirty()** - сеттеры для $pristine/$dirty
- **$setUntouched()**/**$setTouched()** - сеттеры для $touched

Так же ngModelController содержит свойство **$validators**, в котором мы можем определять наши методы для проверки данных, то есть:

\[javascript\] ngModel.$validators.validCharacters = function(modelValue, viewValue) { var value = modelValue || viewValue; return /\[0-9\]+/.test(value) && /\[a-z\]+/.test(value) && /\[A-Z\]+/.test(value) && /\\W+/.test(value); }; \[/javascript\]

Вот тут можно посмотреть как изменяются свойства в зависимости от изменения значений полей:

<iframe style="width: 100%;" src="//codepen.io/sevilayha/embed/xFcdI/?height=332&amp;theme-id=0&amp;default-tab=result" width="300" height="332" frameborder="no" scrolling="no" allowfullscreen="allowfullscreen">See the Pen <a href="https://codepen.io/sevilayha/pen/xFcdI/">AngularJS Form Validation</a> by Chris Sevilleja (<a href="https://codepen.io/sevilayha">@sevilayha</a>) on <a href="https://codepen.io">CodePen</a>. </iframe>

Ангуляр полностью дублирует атрибуты валидации HTML5, причем в некоторых случаях оставляя их без изменения (как required), а в некоторых изменяет названия атрибута (ng-maxlength); плюс использует свои дополнительные:

- **required** - просто парсит HTML5 атрибут
- **ng-minlength**/**ng-maxlength** - ограничения по количеству символово (как и maxlength)
- **type** - использует атрибут HTML5
- **ng-pattern** - отличие в том что мы можем подставлять паттерн динамически и ошибка по умолчанию не тригерится наверх ([сравнить](https://plnkr.co/edit/O3RDTSi06iVNEj9jfLx4?p=preview))

**!Внимание**:

- все валидируемые елементы должны содержать директиву **ng-model**, именно благодаря ней мы имеем доступ к ngModelController
- если у вас в **scope** свойство, которая не соответствует критериям, - оно выведено не будет.

## Свои кастомные проверки данных на AngularJS

Для дополнительных проверок можно создать директиву, которая будет навешиваться на элемент.

C директивой все понятно. Но вот то, как мы вернем потом значение, не так однозначно, особенно в случае асинхронных операций.

Вот пример проверки уникальности записи от [ng-newsletter](https://www.ng-newsletter.com/posts/validations.html), атрибут-директива для элемента формы, которая следит за изменением значения:

\[javascript\] app.directive('ensureUnique', \['$http', function($http) { return { require: 'ngModel', link: function(scope, ele, attrs, c) { scope.$watch(attrs.ngModel, function() { $http({ method: 'POST', url: '/api/check/' + attrs.ensureUnique, data: {'field': attrs.ensureUnique} }).success(function(data, status, headers, cfg) { c.$setValidity('unique', data.isUnique); }).error(function(data, status, headers, cfg) { c.$setValidity('unique', false); }); }); } } }\]); \[/javascript\]

А вот так (взято из [оф доки](https://docs.angularjs.org/guide/forms)) мы можем переопределить стандартную проверку:

\[javascript\] app.directive('overwriteEmail', function() { var EMAIL\_REGEXP = /^\[a-z0-9!#$%&'\*+/=?^\_\`{|}~.-\]+@example\\.com$/i;

return { require: 'ngModel', restrict: '', link: function(scope, elm, attrs, ctrl) { if (ctrl && ctrl.$validators.email) {

ctrl.$validators.email = function(modelValue) { return ctrl.$isEmpty(modelValue) || EMAIL\_REGEXP.test(modelValue); }; } } }; }); \[/javascript\]

И есть еще один интересный [пример](https://habrahabr.ru/post/167793/) с хабра и использованием свойств котроллера модели $parsers и $formatters:

\[javascript\] mod.directive('strongPassRequired', function () { var isValid = function(s) { return s && s.length > 5 && /\\D/.test(s) && /\\d/.test(s); };

return { require:'ngModel', link:function (scope, elm, attrs, ngModelCtrl) {

ngModelCtrl.$parsers.unshift(function (viewValue) { ngModelCtrl.$setValidity('strongPass', isValid(viewValue)); return viewValue; });

ngModelCtrl.$formatters.unshift(function (modelValue) { ngModelCtrl.$setValidity('strongPass', isValid(modelValue)); return modelValue; }); } }; }); \[/javascript\]

хотя думаю можно было ограничится просто использованием свойства $validators.

 

## Вывод сообщений об ошибках и ng-messages

Начиная с Angular 1.3 появилась возможность подключить прекрасный модуль [ngMessages](https://docs.angularjs.org/api/ngMessages/directive/ngMessages), который серьезно упрощает работу по выводу ошибок. В старых версиях нам приходилось выдумывать что-то с ng-if/ng-show, а теперь все можно сделать так:

\[html\] <form name="demoForm"> <input name="amount" type="number" ng-model="amount" max="100"> <div ng-messages="demoForm.amount.$error"> <div ng-message="number">Should be a number</div> <div ng-message="max">The number is too large.</div> </div> </form> \[/html\]

Поиграться с кодом можно [тут](https://jsfiddle.net/STEVER/n7uzrets/).

!Внимание: при этом не забудьте подключить в зависимости ваш модуль:

\[javascript\] angular.module('app', \['ngMessages'\]); \[/javascript\]

ну и конечно подключить .js файл.

## Стилизация валидируемых полей

Для каждого состояния Ангуляр добавляет специальный класс:

- **ng-valid**/**ng-invalid**
- **ng-valid-\[key\]** / **ng-invalid-\[key\]** - отдельный для каждого ключа заданного через  **$setValidity**
- **ng-pristine**/**ng-dirty**
- **ng-touched**/**ng-untouched**
- **ng-pending** - ждет асинронной валидации от **$asyncValidators**

 

Сейчас вот задался вопросом: "Почему до сих пор нет никакого готового (и популярного) модуля для валидации данных?" Чтобы можно было на всю форму (например) навесить директиву и передать ей конфиг заполняемых полей. Если что-то знаете в тему - подскажите пожалуйста в комментариях. Иначе прийдется делать свой велосипед.
