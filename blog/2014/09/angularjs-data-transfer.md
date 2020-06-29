---
title: "Передача данных между сущностями AngularJS"
tags: "AngularJs,javascript,scope"
date: "2014-09-06"
---

Один из самых распространенных вопросов по **AngularJS** - передача данных от одной сущности другой. На самом деле вариантов не так много. Попробуем их все рассмотреть.

Для начала определимся какими типами сущностей будем оперировать: это будет **контроллер**, **сервис** и **представление**.

## Из контроллера в представление

Посредством **$scope**

```javascript
$scope.name = "Bob";
```

либо для нового синтаксиса контроллера через **this** в контроллере:

```javascript
this.name = "Bob";
```

а в шаблоне представления получим через переменную:

```html
<h1>Hi, {{name}}</h1>
```

для нового синтаксиса:

```html
<div ng-controller="userController as user"><h1>Hi, {{user.name}}</h1></div>
```

Код примера [тут](https://jsfiddle.net/STEVER/8p31cgge/ "jsfiddle.net").

## Из представления в контроллер

Для этого мы используем **two-way data binding** с помощью директив **ng-bind** и **ng-model** в представлении:

```html
<input ng-model="name.first" />
```

теперь при изменении значения поля ввода будет изменяться **name.first** значение в контроллере.

Пример [тут](https://jsfiddle.net/STEVER/q0vfaph5/ "jsfiddle.net").

## Из представления в представление

Фактически осуществляется посредством контроллера (рассмотрено выше), но переменную-свойство в контроллере можем не создавать: она будет создана автоматически. Итого имеем связь представление - контроллер - представление. Важно, чтобы 2 элемента представления, которые собираемся синхронизировать, находились в рамках одного контроллера.

```html
<div ng-controller="userController">; <input ng-model"name.first">; <textarea ng-model="name.first">; </div>
```

Пример [тут](https://jsfiddle.net/STEVER/eyxj1nhf/ "jsfiddle.net").

## Из контроллера в сервис

тут все просто: инжектим сервис в контроллер и задаем значение свойству, либо вызываем сеттер-метод (что ИМХО более верно):

```javascript
app
  .controller("userController", function (nameStorage) {
    nameStorage.setName("Alice");
    alert(nameStorage.getName());
  })
  .service("nameStorage", function () {
    var _name = "Bob";
    return {
      setName: function (name) {
        _name = name;
      },
      getName: function () {
        return _name;
      },
    };
  });
```

Пример [тут](https://jsfiddle.net/STEVER/fcLgt7co/ "jsfiddle.net").

## Из сервиса в контроллер

Мы не можем изменять данные контроллера в сервисе, но мы можем "залинковать" объект-свойство сервиса на свойство контроллера, тогда в случае изменений внутри этого объекта - данные контроллера также будут обновлены:

```javascript
app.controller('userController', function ($scope, nameStorage) { $scope.name = nameStorage.name; alert($scope.name.first + ' ' + $scope.name.last); setTimeout(function () { alert($scope.name.first + ' ' + $scope.name.last); }); }) .service('nameStorage', function () { this.name = { first: 'Alice', last: 'Green' };

//just to inimitate sevice change var self = this; setTimeout(function () { self.name.first = 'Bob'; }); });
```

из-за того, что нужно было имитировать изменения сервиса, пример получился не самый простой. Вот [полный код](https://jsfiddle.net/STEVER/cL00127n/ "jsfiddle.net") примера, надеюсь с ним будет проще.

## Из сервиса в представление

Осуществляется посредствам контроллера, то есть сервис - контроллер - представление.

```javascript
app.controller('userController', function ($scope, nameStorage) { $scope.name = nameStorage.name; }) .service('nameStorage', function ($timeout) { this.name = { first: 'Alice', last: 'Green' };


//just to inimitate sevice change var self = this; $timeout(function () { self.name.first = 'Bob'; }, 2000); });
```

и представление соответственно:

```html
<div ng-controller="userController">
  <h1>{{name.first + ' ' + name.last}}</h1>
</div>
```

Полный пример [тут](https://jsfiddle.net/STEVER/wmhg5qp2/ "jsfiddle.net").

## Из представления в сервис

Аналогично предыдущему: представление - контроллер - сервис.

[Пример](https://jsfiddle.net/STEVER/egs9c9kc/ "jsfiddle.net").

## Из сервиса в сервис

Один сервис инжектит другой и там вызывается сеттер-метод:

```javascript
app
  .controller("userController", function ($scope, userStorage) {})
  .service("nameStorage", function () {
    this.name = { first: "Alice", last: "Green" };
  })
  .service("userStorage", function (nameStorage) {
    nameStorage.name = { first: "Bob", last: "Brown" };
  });
```

[Пример](https://jsfiddle.net/STEVER/x0Lwgxs2/ "jsfiddle.net").

## Из контроллера в контроллер

Самый интересный случай, когда в зависимости от специфики может быть решен различными способами. Возможные варианты:

- из родительского контроллера в дочерний
- и дочернего в родительский
- из контроллера в контроллер, когда оба находятся на одном уровне (либо в разных ветках иерархии)

Рассмотрим каждый отдельно.

## Из родительского контроллера в дочерний

тут также могут быть 2 случая:

- открытый scope дочернего контроллера
- изолированный scope дочернего контроллера

В случае с открытым - все просто: дочерний контроллер наследует свойства scope родителя по умолчанию:

```html
<div ng-controller="userController">
  <div ng-controller="nameController"></div>
</div>
```

_ как видим _nameController_ является дочерним по отношению к _userController_, поэтому мы легко можем получить доступ к свойствам родителя:

```javascript
app
  .controller("userController", function ($scope) {
    $scope.name = "Bob";
    setTimeout(function () {
      $scope.name = "Alice";
    });
  })
  .controller("nameController", function ($scope) {
    alert($scope.name);
    setTimeout(function () {
      alert($scope.name);
    });
  });
```

[Пример](https://jsfiddle.net/STEVER/spskhL7o/ "jsfiddle.net").

С случае с изолированным scope(который мы можем получить при создании директивы) нам необходимо "залинковать" необходимые свойства родительского в дочерний. Представление будет выглядеть следующим образом:

```html
<div ng-controller="userController"><div user name="{{name}}"></div></div>
```

а код директивы и контроллера:

```javascript
var app = angular.module("foo", []);

app
  .controller("userController", function ($scope) {
    $scope.name = "Bob";
    setTimeout(function () {
      $scope.name = "Alice";
      $scope.$apply();
    });
  })
  .directive("user", function () {
    return {
      scope: { name: "@" },
      link: function (scope) {
        alert(scope.name);
        setTimeout(function () {
          alert(scope.name);
        });
      },
    };
  });
```

В этом месте мы описываем связывание:

```javascript
scope: { name: '@' },
```

_ это означает, что _name_ будет взято из атрибута директивы.

[Полный код](https://jsfiddle.net/STEVER/321x8w2L/ "jsfiddle.net").

## Из дочернего контроллера в родительский

Вот этот вариант уже поинтереснее, тут не все так просто, ибо не смотря на то, что мы можем получить доступ к свойствам scope родителя, этот доступ будет только на чтение. При попытке изменить какое-либо свойство родителя, мы лишь получим создание одноименного свойства в дочернем контроллере. Это объясняется прототипной моделью наследования scope.

Возможны 2 решения:

- изменяя не само свойство, а свойство свойства (знаю, сильно запутано, но [на примере](https://jsfiddle.net/STEVER/xteh8gs9/ "jsfiddle.net") не должно быть сложно) То есть, вместо _$scope.name_, используем _$scope.name.first_.
- через специально созданный сеттер-метод в родительском котроллере. [Пример](https://jsfiddle.net/STEVER/7q7guwo6/ "jsfiddle.net"). :

```javascript
app
  .controller("userController", function ($scope) {
    $scope.name = "Bob";
    alert($scope.name);
    setTimeout(function () {
      alert($scope.name);
    }, 500);

    $scope.setName = function (name) {
      $scope.name = name;
    };
  })
  .controller("nameController", function ($scope) {
    setTimeout(function () {
      $scope.setName("Alice");
    });
  });
```

Случай с изолированным скоупом полностью аналогичен предыдущему (Из родительского контроллера в дочерний), только линковка будет делаться не односторонняя:

```javascript
scope: { name: '@' },
```

а двунаправленная

```javascript
scope: { name: '=' },
```

[Полный пример](https://jsfiddle.net/STEVER/L02te727/ "jsfiddle.net").

## Передача данных между контроллерами находящимися на разных ветках

т.е., грубо говоря, когда мы не можем применить к ним характеристику родитель-ребенок. Решение будет заключаться в нахождении общего родительского контроллера( вплоть до **$rootScope** ), посредством которого и будет осуществлена передача: контроллер А - общий родительский контроллер - контроллер Б.

Передача данных дочернего и родительского контроллера уже рассмотрена выше, поэтому даю просто общий [пример](https://jsfiddle.net/STEVER/k22ku4kx/ "jsfiddle.net")  связки (контроллерА - родительский контроллер - контроллерБ)

Также передача данных между несвязанными напрямую контроллерами может происходить с помощью событий.

## Общение контроллеров с помощью событий

Это на столько отдельный случай, что я решил посвятить ему целый пункт.

Сразу оговорюсь: если вы еще только начинаете работать с **AngularJS** - не используйте этот подход. При неумелом его использовании может получиться такой "салат" из зависимостей, что потом сами не разберетесь.

Передавать события (с данными) можно посредством двух методов **$scope.$emit** и **$scope.$broadcast**. Отличие **$emit** от **$broadcast** заключается в том, что **$emit** передает события вверх по цепочке в скоупы всех родительских контроллеров, а **$broadcast** наоборот - в дочерние:

```javascript
$scope.emitEvent = function () {
  var data = { x: 5 };
  $scope.$emit("myevent", data);
};

$scope.broadcastEvent = function () {
  var data = { y: 10 };
  $scope.$broadcast("myevent", data);
};
```

Чтобы словить событие необходимо использовать метод **$scope.$on**.

```javascript
$scope.$on('myevent', function(data){ 
  //... 
  });
```

[Полный пример](https://jsfiddle.net/STEVER/hhfwco97/ "jsfiddle.net") работы с событиями.

## Общение контроллеров с помощью специального сервиса

Существует еще один способ общения между сервисами, который напомнил [Владимир Гомонов](https://www.facebook.com/vladimir.gomonov) ( благодарю за дополнение! ), - это использование специального сервиса, который будет инжектиться в оба контроллера и в итоге получим связку: контроллер А - сервис - контроллер Б. Взаимодействие контроллер - сервис и сервис - контроллер уже рассмотрено выше, поэтому только выложу общий [пример](https://jsfiddle.net/STEVER/9a2sLdy6/).

Вроде бы все возможные варианты передачи данных в рамках **AngularJS** перечислил, если что-то забыл - пишите - добавим.
