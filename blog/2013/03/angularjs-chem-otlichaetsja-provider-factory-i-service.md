---
title: "AngularJs: чем отличается provider, factory и service"
tags: "AngularJs,javascript"
date: "2013-03-02"
slug: "angularjs-чем-отличается-provider-factory-и-service"
---

Для начала абстрагируемся вообще от **AngularJs** и задач возложеных на 3 его метода **provider**, **factory** и **service**.

Попробуем представить, что у нас просто есть метод provider:

var provider = function(name, provider_) { [some code] }

и он как-то работает, как? - нас пока не интересует. Теперь посмотрим на [код](https://raw.github.com/angular/angular-seed/master/app/lib/angular/angular.js) для метода **factory**:

function factory(name, factoryFn) { return provider(name, { $get: factoryFn }); }

из которго видно, что это просто обертка для **provider**.

Идем дальше: что же представляет собой **service**:

function service(name, constructor) {
    return factory(name, ['$injector', function($injector) {
      return $injector.instantiate(constructor);
    }]);
  }

_ тоже обертка, только для **factory**.

[Вот](https://jsfiddle.net/pkozlowski_opensource/PxdSP/14/) пример кода одной задачи реализованной 3мя способами.
