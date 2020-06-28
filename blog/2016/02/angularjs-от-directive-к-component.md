---
title: "AngularJS: от directive() к component()"
tags: "Angular2,AngularJs,angularjs-component,angularjs-directive,javascript,Хочу сделать мир лучше"
date: "2016-02-17"
---

_пост был подготовлен на основе статьи [Exploring the Angular 1.5 .component() method](https://toddmotto.com/exploring-the-angular-1-5-component-method/) от Todd Moto_.

В **Angular 1.5** нам был представлен новый метод **.component()**, который намного проще чем **.directive()** и при этом он использует все лучшее по умолчанию. Метод **.component()** также позволит разработчикам писать в **Angular2** стиле, то есть сделает переход на вторую версию максимально безболезненным.

В этом посте мы попробуем параллельно разобрать старый и новый подходы для создания компонентов.

На примере простой директивы **counter** мы посмотрим как можно создать компонент с аналогичной функциональностью:

[javascript] .directive('counter', function counter() { return { scope: {}, bindToController: { count: '=' }, controller: function () { function increment() { this.count++; } function decrement() { this.count--; } this.increment = increment; this.decrement = decrement; }, controllerAs: 'counter', template: [ ' <div class="todo">', '<input type="text" ng-model="counter.count">', '<button type="button" ng-click="counter.decrement();">-</button>', '<button type="button" ng-click="counter.increment();">+</button>', '</div> ' ].join('') }; }); [/javascript]

вот как это будет выглядеть:

<iframe src="//jsfiddle.net/STEVER/8e59shvc/embedded/" width="100%" height="300" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

## Объект вместо Функции

Начнем наш анализ со способа задания и обратим внимание на то, что параметры в компонент передаются как объект (а не функция, что было в директиве):

[javascript] // до .directive('counter', function counter() { return { }; });

// после .component('counter', { }); [/javascript]

## Scope и BindToController становятся просто Bindings

В директиве мы можем задавать **scope** 3-мя способами: родительский(скоуп не создается), наследник от родительского, изолированный. Со временем мы приходим к выводу, что изолированный скоуп, где мы четко задаем входящие параметры, наилучший вариант. Так же каждый раз для изолированного скоупа нам приходиться прописывать **bindToController**, чтобы прокинуть данные со скоупа непосредственно на контроллер директивы.

Свойство компонента **bindings** позволяет использовать 2 в одном, так как компонент использует изолированный скоуп по умолчанию:

[javascript] // before .directive('counter', function counter() { return { scope: {}, bindToController: { count: '=' } }; });

// after .component('counter', { bindings: { count: '=' } }); [/javascript]

## Controller и ControllerAs

Ничего не изменилось в способе задания контроллера, однако теперь **controllerAs** параметр по умолчанию, который задан как "**$ctrl**": то есть если мы в контроллере напишем:

[javascript] this.x = 5; [/javascript]

то в шаблоне компонента потом можно будет обратиться вот так:

[html] <div>{{$ctrl.x}}</div> [/html]

Итак, что у нас получилось с контроллером для обоих случаев:

[javascript] // до .directive('counter', function counter() { return { scope: {}, bindToController: { count: '=' }, controller: function () { function increment() { this.count++; } function decrement() { this.count--; } this.increment = increment; this.decrement = decrement; }, controllerAs: 'counter' }; });

// после .component('counter', { bindings: { count: '=' }, controller: function () { function increment() { this.count++; } function decrement() { this.count--; } this.increment = increment; this.decrement = decrement; } }); [/javascript]

Я очень упростил для понимания пункт из статьи, поэтому рекомендую также заглянуть в оригинал.

## Шаблоны

В определении шаблонов есть небольшое различие: шаблон компонента может задаваться как функция, в которую инжектятся элемент и атрибуты:

[javascript] { ... template: function ($element, $attrs) { // access to $element and $attrs return '...'; } ... } [/javascript]

## Улучшенное require

Да, это свершилось! Теперь мы можем задать имя для контроллера, подключаемого к нашему компоненту, и обратиться к нему из контроллера( до этого только из метода link, а в контроллер оно попадало только [путем ужасных костылей](https://github.com/angular/angular.js/issues/5893)):

[javascript] { ... require: { parent: '^parentComponent' }, controller: function () { // use this.parent to access required Objects this.parent.foo(); } ... } [/javascript]

В данном случае мы определили подключаемый контроллер на свойстве **parent**.

## Одностороннее связывание

Еще одна фишка компонентов и **Angular1.5** это одностороннее связывание, которое определяется следующим синтаксисом:

[javascript] { ... bindings: { oneWay: '<', twoWay: '=' }, ... } [/javascript]

если мы задали свойство _oneWay_ таким образом, то оно будет реагировать на изменения внешнего связанного объекта, при этом свои изменения передавать "наружу" не будет. И да, сразу отвечу на вопрос, который у вас наверное появился: работает только в одну сторону.

## Нет никакого нового концепта

Если вы посмотрите на [исходный код](https://github.com/angular/angular.js/blob/master/src/ng/compile.js#L1076), то увидите что разработчики AngularJS особо не парились и сделали метод **component()** просто оболочкой над **directive()**.

## Обновляемся до Angular2

Как уже было сказано: использование метода **.component()** серьезно упростит переход на **Angular2**. Посмотрите как будет выглядеть ваш компонент во второй версии фреймворка(конечно, с новым синтаксисом шаблонов):

[javascript] var Counter = ng .Component({ selector: 'counter', template: [ ' <div class="todo">', '<input type="text" [(ng-model)]="count">', '<button type="button" (click)="decrement();">-</button>', '<button type="button" (click)="increment();">+</button>', '</div> ' ].join('') }) .Class({ constructor: function () { this.count = 0; }, increment: function () { this.count++; }, decrement: function () { this.count--; } }); [/javascript]
