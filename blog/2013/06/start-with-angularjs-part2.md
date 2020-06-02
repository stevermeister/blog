---
title: "С чего начать изучение AngularJS. Часть2 - Шаблоны оживают."
tags: "AngularJs,javascript,Хочу сделать мир лучше"
date: "2013-06-24"
---

В [первой части](http://stepansuvorov.com/blog/2012/12/%D1%81-%D1%87%D0%B5%D0%B3%D0%BE-%D0%BD%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%B8%D0%B7%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-angularjs/ "С чего начать изучение AngularJS") мы разобрали как развернуть проект, его структуру, MVC компоненты и как это все тестировать с помощью [testacular](http://stepansuvorov.com/blog/2013/01/testacular-%D0%B2-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8E/ "testacular").

В этой части мы уделим больше внимания шаблонам и директивам.

Итак, что из себя представляют **шаблоны AngularJs**? Это HTML дополненный переменными, выражениями и директивами.

## Переменные

Определяются через двойные фигурные скобки в тексте HTML:

<span>Hello, {{name}}!</span>

либо без кавычек, если указываются в директиве:

<input type="submit" ng-disabled="validate">

## Выражения(expression)

Уже разбиралось в первой части, интеграция такая же как и у переменных:

 <p>1 + 2 = {{ 1 + 2 }}</p>

В выражении мы так же можем вызвать методы из **$scope**:

 <p>1 + 2 = {{displaySum(1,2)}}</p>

Важно помнить, выражение - это еще не полный JavaScript, поэтому объекты типа Math работать не будут, если конечно мы их предварительно не свяжем через контроллер.

## Директивы

Вот тут начинается самое интересное.

**Директива** - это что-то типа вспомогательного элемента для отрисовки представления. Может быть встроена в HTML следующими способами:

тип

общий вид

пример

В виде атрибута тега

<div directive="expression">

<div ng-click="sayHello()">

Значением атрибута class

<div class="directive:expression">

<div class="ng-controller:mainCntl">

Отдельным тегом

<tag></tag>

<notifcation></notification>

комметарием

<!-- directive: my-dir exp -->

<--! directive: alert-->

Все директивы можно условно разделить на 2 типа: **встроенные**(которые уже присутсвуют во фремворке) и **кастомные**(написаные нами)

Встроенные директивы начинаются с префикса **ng-** либо **ng:** (разработчки фреймворка допускают использование обоих вариантов)

Основные встроенные директивы:

Определяющие назначение блока:

- [ngApp](http://docs.angularjs.org/api/ng.directive:ngApp) - определяет корневой элемент для приложения(обычно это html либо body, но могут быть и другие вариаты)
- [ngController](http://docs.angularjs.org/api/ng.directive:ngController) - задает имя контроллера(метод) для блока
- [ngForm](http://docs.angularjs.org/api/ng.directive:ngForm) - связывает элементы формы

Вспомогательные для отображения:

- [ngClassEven](http://docs.angularjs.org/api/ng.directive:ngClassEven)/[ngClassOdd](http://docs.angularjs.org/api/ng.directive:ngClassOdd) - когда мы хотим что-то сделать для четных/нечетных элементов в списке( используется совместно с [ngRepeat](http://docs.angularjs.org/api/ng.directive:ngRepeat))
- [ngHide](http://docs.angularjs.org/api/ng.directive:ngHide)/[ngShow](http://docs.angularjs.org/api/ng.directive:ngShow) - прячет либо показывает элемент в зависимости от значения

Обертки для стандартых атрибутов:

- [ngClass](http://docs.angularjs.org/api/ng.directive:ngClass)
- [ngStyle](http://docs.angularjs.org/api/ng.directive:ngStyle)
- [ngChecked](http://docs.angularjs.org/api/ng.directive:ngChecked)
- [ngDisabled](http://docs.angularjs.org/api/ng.directive:ngDisabled)
- [ngHref](http://docs.angularjs.org/api/ng.directive:ngHref)
- [ngSrc](http://docs.angularjs.org/api/ng.directive:ngSrc)
- [ngSelected](http://docs.angularjs.org/api/ng.directive:ngSelected)
- [ngReadonly](http://docs.angularjs.org/api/ng.directive:ngReadonly)

Встроенная логика:

- [ngInclude](http://docs.angularjs.org/api/ng.directive:ngInclude) - позволяет подключать отдельные файлы
- [ngTransclude](http://docs.angularjs.org/api/ng.directive:ngTransclude) - используется внутри кастомных директив для вывода контента заданного снаружи при объявлении директивы
- [ngRepeat](http://docs.angularjs.org/api/ng.directive:ngRepeat) - что-то типа встроенного цикла
- [ngModel](http://docs.angularjs.org/api/ng.directive:ngModel) - связывание состояния/значения элемента с моделью/объектом

Обертки для атрибутов событий:

- [ngChange](http://docs.angularjs.org/api/ng.directive:ngChange)
- [ngClick](http://docs.angularjs.org/api/ng.directive:ngClick)
- [ngDblclick](http://docs.angularjs.org/api/ng.directive:ngDblclick)
- [ngMousedown](http://docs.angularjs.org/api/ng.directive:ngMousedown)/[ngMouseenter](http://docs.angularjs.org/api/ng.directive:ngMouseenter)/[ngMouseleave](http://docs.angularjs.org/api/ng.directive:ngMouseleave)/[ngMousemove](http://docs.angularjs.org/api/ng.directive:ngMousemove)/[ngMouseover](http://docs.angularjs.org/api/ng.directive:ngMouseover)/[ngMouseup](http://docs.angularjs.org/api/ng.directive:ngMouseup)
- [ngSubmit](http://docs.angularjs.org/api/ng.directive:ngSubmit)

Если же наши потребности не удовлетворяют встроенные директивы - тогда мы можем написать свою. Как это делается? Все директивы создаются с помощью метода модуля - **directive()**, который имеет следующий синтаксис:

somemodule.directive( directiveName, directiveFactory )

- directiveName - имя нашей директивы
- directiveFactory - фабрика, для создания директивы

Фабрика может возвращать как функцию(простая нотация), так и объект с методами и свойствами(сложная нотация).

Синтаксис простой нотации:

function directiveFactory(){
  // directive private methods here
  return function(scope, element, attrs){
    //directive logic
  }
}

Синтакс сложной нотации:

function directiveFactory(){
 var directiveDefinitionObject = {
    priority: 0,
    template: '',
    templateUrl: 'directive.html',
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        post: function postLink(scope, iElement, iAttrs, controller) { ... }
      }
    },
    link: function postLink(scope, iElement, iAttrs) { ... }
  };
  return directiveDefinitionObject;
}

Подробно о каждом параметре

Параметр

Описание

Пример

priority

 приоретива выполения(для случая когда на одном элементе несколько директив)

1

template

 шаблон HTML

 <div ng-click="doSomething()"></div>

templateUrl

ссылка на файл шаблона

 ./views/alert.html

replace

 если true - то шаблон директивы заменит элемент, false - произойдет append

 true

transclude

 компилирует контект элемента и делает возможные его вставку внутрь шаблона (по средством [ngTransclude](http://docs.angularjs.org/api/ng.directive:ngTransclude) )

 false

restrict

 задает способ встраивания(смотри выше):

- `E` - тэг(имя элемента)
- `A` - атрибут
- `C` - класс
- `M` - комментарий

 E

scope

 Определяет способ передачи scope в директиву

 true

controller

 метод(либо ссылка на метод) где описано поведение(логика)

 dialogDirectiveController

compile

 метод(либо ссылка на метод) с инструкциями по компиляции шаблона

 function(tElement, tAttrs, transclude){ ... }

link

 основной параметр фабрики - метод(либо ссылка на метод) по связыванию директивы с приложением

 function(scope, iElement, iAttrs){ ... }

## Опции compile и link

Функция компиляции **compile** (_используется довольно редко_)  трансформирует HTML шаблон. После чего фукнция линковки **link** регистрирует обработчики событий на DOM обновленного HTML.

## Опция controller

Необходима в случае, когда логика директивы выходит за пределы одного метода и нам уже необходимма группа методов. Такую группу методов мы можем объединить в функцию-контроллер. Это будет специальный тип контроллера "связанный с директивой", которые должен взаимодействать только с данной директивой.

## Опция scope

В зависимости от типа переданного параметра ведет себя по разному:

- (boolean)**true** - создается новый **scope** конкретно для этой директивы
- (object hash)**{}** - задается конкретный **изолированный scope** - т.е. scope не унаследованный от родительского

По умолчанию эта опция выставлена в **false** (используется **scope** ближайшего контроллера).

Изолированный scope может влючать в себе ссылки на элементы родительского scope при использовании нетривиального синтаксиса(специальный префикс символ (_@_, _\=_, _&_ )перед имеем метода/переменой):

- @ - переменную локального scope со значением DOM аттрибута
- \= - двустороннее связывание значения атрибута и переменной
- & - позволяет выполнять выражения из аттрибута в рамках родительского scope

В [примере с официального сайта](http://jsfiddle.net/STEVER/zKTmC/ "jsfiddle") мы видим задания scope для директивы следующим образом:

scope: { title:'@zippyTitle' }

Т.е., будет создан изолированый scope со ссылкой на title, которая будет связана с атрибутом _zippy-title_ (Внимание! именно такая нотация для связывания с атрибутом, не _zippyTitle_, а _zippy-title_).

Попробуем его максимально упростить...

Я надеюсь [вот этот пример](http://jsfiddle.net/STEVER/zGWN4 "jsfiddle") (оставлена только суть) позволит разобраться в вопросе связывания переменных изолированного scope с родительским.

Также прошу обратить внимание на проблему которая возникает: при попытке изменения модели дочернего scope - мы теряем связь с родительской.

Думаю будет еще как минимум один пост на структуру scope в Angular, так что для это статьи пока все.

## все части рубрики "С чего начать изучение AngularJS":

- [Часть1 - С чего начать изучение AngularJS.](http://stepansuvorov.com/blog/2012/12/%D1%81-%D1%87%D0%B5%D0%B3%D0%BE-%D0%BD%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%B8%D0%B7%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-angularjs/)
- [Часть2 – Шаблоны оживают.](http://stepansuvorov.com/blog/2013/06/start-with-angularjs-part2/)
- [Часть3 – Ох уж эти сервисы.](http://stepansuvorov.com/blog/2015/02/%D1%81-%D1%87%D0%B5%D0%B3%D0%BE-%D0%BD%D0%B0%D1%87%D0%B0%D1%82%D1%8C-angularjs-%D1%87%D0%B0%D1%81%D1%82%D1%8C3/)
