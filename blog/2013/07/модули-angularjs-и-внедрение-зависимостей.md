---
title: "Модули AngularJS и внедрение зависимостей"
tags: "AngularJs,javascript"
date: "2013-07-04"
---

Как извесно [Dependency Injection](https://ru.wikipedia.org/wiki/%D0%92%D0%BD%D0%B5%D0%B4%D1%80%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B8) - это один из основных концептов архитектуры AngularJS. Разберем несколько примеров использования сервисов в модулях.

За основу данного поста я взял вот [эту](https://technofattie.blogspot.nl/2013/04/angular-modules-and-dependency-injection.html "Angular Modules And Dependency Injection") статью, которую перевел и немного поправил.

Представим что у нас в модуле _foo_ есть примитивный сервис _simpleService_

function simpleService(){
   this.name = "simpleService";
}

angular.module('foo', [])
   .service('simpleService', simpleService);

Теперь представим, что мы хотим вручную получить экземпляр этого сервиса (что в практике скорее всего делать не прийдется) и использовать. Чтобы сделать это, мы создадим новый **injector** и поручим ему магию создания сервиса для нас:

var myInjector = angular.injector(['foo']);
var service = myInjector.get('simpleService');
 console.log(service.name); // 'simpleService'

Итак, это именно оно... самый простой случай. Но что если у нас 2 модуля с сервисами, которые имеют одинаковые имена? Что тогда? Тут уже становится интересно, давайте рассмотрим еще пример:

angular.module('foo', [])
   .service('simpleService', function(){ this.name = "foo"; });

angular.module('bar', [])
   .service('simpleService', function(){ this.name = "bar"; });

var fooSvc = angular.injector(['foo']).get('simpleService');
var barSvc = angular.injector(['bar']).get('simpleService');

console.log(fooSvc.name); // 'foo'
console.log(barSvc.name); // 'bar'

Это похоже на то, что мы ожидали увидеть: каждый инжектор относится только к одному модулю и поэтому сервисы изолированы. Но ведь мы можем создать инжектор, который будет относиться более чем одному модулю. Что будет тогда?

var fooSvc = angular.injector(['foo','bar']).get('simpleService');
var barSvc = angular.injector(['bar','foo']).get('simpleService');

console.log(fooSvc.name); // 'bar'
console.log(barSvc.name); // 'foo'

Видите что произошло? **Модуль, который регистрируется последним, перезаписывает другие одноименные с ним модули.**

Но что если модули имеют зависимости? Что это меняет?

angular.module('foo', [])
   .service('simpleService', function(){ this.name = "foo"; });

angular.module('bar', ['foo'])
   .service('simpleService', function(){ this.name = "bar"; });

var fooSvc = angular.injector(['foo','bar']).get('simpleService');
var barSvc = angular.injector(['bar','foo']).get('simpleService');

console.log(fooSvc.name); // 'bar'
console.log(barSvc.name); // 'bar'

И тут тоже все решает порядок, но в этом случае нужно помнить о том, что модули-зависимости основного модуля будут проинициализированы первыми, т.е. для модуля **bar** сначала будет проинициализирован модуль-зависимость **foo**.

Представим,  что мы тестируем приложение и хотим заменить [$httpBackend](https://docs.angularjs.org/api/ng.$httpBackend) сервис на наш кастомный вариант или заменить его на [mock](https://ru.wikipedia.org/wiki/Mock-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82 "wiki") с заранее известным поведением. Это очень просто сделать в рамках архитектуры Ангулара. Все что необходимо  - это создать модуль, который будет иметь зависимость от [ng module](https://docs.angularjs.org/api/ng) и переопределить необходимый сервис(т.е. объявить в нашем модуле сервис с таким же именем).

Замена сервиса - это хорошо, но что особенно здорово в Ангулар - возможность получить сервис сразу после его создания. Это может быть достигнуто путем использования декоратора (**decorator**):

angular.module('foo', [])
   .service('simpleService', function(){ this.name = "foo"; });

angular.module('bar', ['foo'])
   .config(function($provide){

      //$provide was injected for me automatically by Angular
      $provide.decorator('simpleService', function($delegate){

         //$delegate is the service instance, and is
         // also injected automatically by Angular
         $delegate.name += "|bar";

  return $delegate;
      });
   });

var fooSvc = angular.injector(['foo']).get('simpleService');
var barSvc = angular.injector(['bar']).get('simpleService');

console.log(fooSvc.name); // 'foo'
console.log(barSvc.name); // 'foo|bar'

(С кодом можно поиграться [тут](https://jsfiddle.net/STEVER/RVbMP/ "JsFiddle"))

Не вдаваясь в подробности можно сказать что у нас есть возможность получить _simpleService_ из _foo_ и преобразовать его. Более подробно можно почитать в документации о методах [config](https://docs.angularjs.org/api/angular.Module) и [decorator](https://docs.angularjs.org/api/AUTO.$provide#decorator).
