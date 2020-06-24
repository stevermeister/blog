---
title: "Чем Restangular круче $resource"
tags: "$resource,AngularJs,javascript,RestAngular,Хочу сделать мир лучше"
date: "2015-02-24"
---

> Сначала мы не знали AngularJS, поэтому не использовали $resource. Теперь мы знаем AngularJS, поэтому не используем $resource.

То что отличает **Restangular** от **$resource**:

- Он использует **промисы**, вместо "волшебного" заполнения объектов
    - именно поэтому мы можем использовать совместно с **$routeProvider.resolve**
- Нет проблем $resourse:
    - со слешами в конце URL
    - фильтрация входящей информации (например:при запросе списка допускает только массив )
- Поддерживает ВСЕ **HTTP** методы ( **PATCH**, **HEADER** и другие)
- Поддерживает [ETags](https://ru.wikipedia.org/wiki/HTTP_ETag "ru.wikipedia.org")
- Поддерживает элементы ссылающиеся на себя
- Вам не нужно создавать **$resource объект** каждый раз
- Вам не нужно запоминать и вводить каждый раз **полный URL** либо какой-то шаблон
- Поддерживает **вложенные REST ресурсы** (то есть от одного ресурса мы можем легко получить вложенный)
- Позволяет **расширять объекты** своими собственными методами
- Поддерживает **"обернутые" ответы** сервера, когда данные лежат не на корневом уровне, а во вложенном свойстве. Мы легко можем разрулить ситуацию используя [addResponseInterceptor](https://github.com/mgonto/restangular#my-response-is-actually-wrapped-with-some-metadata-how-do-i-get-the-data-in-that-case)

Было взято с [оф доки](https://github.com/mgonto/restangular/blob/master/README.md#differences-with-resource "github.com/mgonto/restangular").

Пример использования **Restangular** [тут](https://plnkr.co/edit/qDRPWa?p=preview).
