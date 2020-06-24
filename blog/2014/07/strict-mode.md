---
title: "Что нужно знать о 'strict mode' в JavaScript"
tags: "javascript,use strict,Хочу сделать мир лучше"
date: "2014-07-08"
---

Заметки в помощь пытающимся понять суть "**strict mode**".

- применяется ко всему скрипту или к отдельным функциям
- одинарные или двойные обрамляющие кавычки - не важно
- кидает ошибку(ReferenceError) при создании **глобальной переменной** 
- предотвращает попытку присвоения **NaN**, **undefined** значения(TypeError)
- предотвращает попытку **переопределения свойства объекта**, [закрытого для переопределения](https://jsfiddle.net/STEVER/2Lyh2/ "jsfiddle.net") (TypeError)
- вернет ошибку(TypeError) при попытке **удалить [неудаляемое свойство](# "например Object.prototype;")**
- останавливает интерпретацию кода (SyntaxError) при объявлении в объекте **2 одинаковых ключей** (без strict - просто переопределяет значение вторым)
- предотвращает **дупликацию имен параметров** при объявлении **метода**
- выключает **восьмиричный** способ задания переменных типа number(SyntaxError )
- запрещает оператор **with** (SyntaxError )
- входящие параметры функции не связаны с **arguments** (т.е. изменение arguments, не ведет к изменению параметра)
- свойство **arguments.callee** недоступно (TypeError)
- **this** будет **undefined**, если контекст не определен (а не window), если контекст определен примитивом, то this будет объект-обертка примитива (String, Boolean, Number...)
- появляются новые зарезервированные слова - **implements**, **interface**, **let**, **package**, **private**, **protected**, **public**, **static**, **yield** - которые нельзя использовать (SyntaxError)
- нельзя(SyntaxError) использовать **функциональное объявление** (functional declaration) внутри условных конструкций (или грубо говоря не на верхнем уровне).

## Полезная литература

- [Strict mode (MDN)](https://developer.mozilla.org/ru/docs/JavaScript/Reference/Functions_and_function_scope/Strict_mode "developer.mozilla.org")
- [What does “use strict” do in JavaScript](https://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it "stackoverflow.com")
