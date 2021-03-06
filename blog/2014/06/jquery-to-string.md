---
title: "jQuery to String"
tags: "javascript,jQuery,toString"
date: "2014-06-28"
---

Иногда возникает необходимость получить **html**_содержимое **jQuery**_объекта в виде **строки**. Первое что приходит в голову

```javascript
$element.html();
```

да, это работает, но мы не получаем html-кода самого контейнера (или корневого элемента). Следующий вариант, который приходит в голову - сделать **обертку** копии текущего элемента и после уже получить содержимое:

```javascript
$('<div>').append($element.clone()).html();
```

но как-то это громоздкою. Погуглив нашел еще интересный вариант, который работает в **jQuery** начиная с версии **1.6**:

```javascript
$element.prop('outerHTML');
```

Ну и можно еще поиграть с переопределением метода toString (сделано в качестве эксперимента и крайне не рекомендуется делать в реальном проекте):

```javascript
$.fn.toString = function() { return $(this).prop('outerHTML'); }
```

после чего

```javascript
alert($element);
```

выведет не просто `[Object object]`, а строку - HTML содержимое объекта.

И [код](https://jsfiddle.net/STEVER/LPPzh/ "jsfiddle").
