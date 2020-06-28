---
title: "Публичные свойства AngularJS"
tags: "AngularJs,javascript,Хочу сделать мир лучше"
date: "2013-07-22"
---

- **bootstrap(element[, modules])** - используется для старта фреймфорка вручную
- **injector(modules)** - создает функцию-инжектор, которая может быть использована для получения сервисов
- **module(name[, requires], configFn)** - метод регистрации модулей приложения
- **copy(source, destination)** - полное копирование(deep copy) объекта
- **extend(dst, src[,src2[,src3...]])** - расширение объекта
- **equals(o1, o2)** - сравнение значений/объектов
- **element(element)** - ссылка на jqLite
- **forEach(obj, iterator[, context])** \- организация цилка forEach
- **noop()** - функция "пустышка", которую можно использовать как заглушку для колбэков
- **identity(value)** - создает функцию, которая вернет значение(используется как обертка для мест, где нужно передавать строго функцию)
- **bind(self, fn, args)** - [карринг](https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5 "Каррирование wiki") для функции fn
- **toJson/fromJson** - конвертация в/из JSON
- **isUndefined, isDefined, isString, isFunction, isObject, isNumber, isElement, isArray, isDate** - методы проверки принадлежности типу
- **version** - версия продукта
- **lowercase**/**uppercase** - перевод в нижний/верхний регистр
- **callbacks** - объект-коллекция колбэков для JSONP
