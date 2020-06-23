---
title: "Angular: Что такое forwardRef?"
tags: "Angular,angular-forwardRef,Хочу сделать мир лучше"
date: "2017-07-15"
---

Мы иногда встречаем в коде:

https://gist.github.com/stevermeister/7144b320098c3afcd1a71879a7eb75ae

и сразу не понятно, что это магическая функция **forwardRef**. На самом деле все просто: [**forwardRef**](https://angular.io/api/core/forwardRef) - это функция-обертка. Зачем она нужна? Чтобы мы могли задавать значением свойства сущности, которые объявлены ниже (иначе будет ошибка):

https://gist.github.com/stevermeister/d7a18d6196d78080642830bac0321c66

Также можно глянуть в [исходники](https://github.com/angular/angular/blob/master/packages/core/src/di/forward_ref.ts#L36), и убедиться что это просто метод-обертка:

https://gist.github.com/stevermeister/950e8095689d5c470c75f0ca87acc0b8
