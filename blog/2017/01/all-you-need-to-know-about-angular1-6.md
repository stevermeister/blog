---
title: "Все что вы должны знать о Angular 1.6"
tags: "Angular,Хочу сделать мир лучше"
date: "2017-01-15"
---

## Обязательное использование $onInit в компонентах

Хук [**$onInit**](https://docs.angularjs.org/guide/component#$onInit), который появился в **1.5**, теперь обязательно использовать, если вы хотите учитывать входящие параметры(**bindings**) при инициализации компонента. В конструкторе компонента эти параметры будут не определены(undefined) начиная с версии 1.6.

Есть костыль, который можно использовать на переходное время:

[javascript] .config(function($compileProvider) { $compileProvider.preAssignBindingsEnabled(true); }); [/javascript]

## Наследование ngModelOptions

В случае, когда у вас в форме несколько полей использующих одинаковые настройки модели ([**ngModelOptions**](https://docs.angularjs.org/api/ng/directive/ngModelOptions)), теперь можно задать все опции в одном месте - form элементе. А так же переопределить какие-то из них на конкретном поле.

## Нет success() и error() методов в $http

Приближаясь к родным JS [промисам](https://learn.javascript.ru/promise), решили выпилить из **[$http](https://docs.angularjs.org/api/ng/service/$http)** сервиса старые методы **sucess** и **error**.

 

Рекомендации по миграции [тут](https://docs.angularjs.org/guide/migration#migrating-from-1-5-to-1-6).
