---
title: "Расширяем стандартные события jQuery"
tags: "Uncategorized"
date: "2014-08-28"
---

Я уже писал о том, как можно создавать [обработчики "своих" событий](https://stepansuvorov.com/blog/2014/06/delayed-keypress-jquery/ "Delayed Keypress или создаем свои хуки событий на jQuery"), теперь хочу немного пролить света на возможности навешивания хуков на существующие события **jQuery**.

Многие знают, что у объекта **jQuery** есть свойство **jQuery.event**, но при этом мало кто знает, что у этого объекта **jQuery.event** есть свойство **jQuery.event.fixHooks**. На этом свойстве и основан алгоритм **jQuery**\-хуков.

**fixHooks** - это объект хуков к событиям, где ключом является имя события, например:

\[javascript\] jQuery.event.fixHooks.click = { //... }; \[/javascript\]

Фактически интерфейс **fixHooks** предоставляет возможность расширить или нормализовать объект **event** (который jQuery создает в процессе обработки родного браузерного объекта события) для каждого события отдельно.

Каждый объект **fixHooks** может содержать в себе 2 свойства:

- **props** - объект - дополнительные свойства, которые будут скопированны из бразерного объекта event
- **filter**  - функция c синтаксисом function ( event, originalEvent ) - которая будет вызвана после создания события jQuery(что и будет первым аргументом). Второй аргумент originalEvent - браузерное событие. Функция должна вернуть событие jQuery.

Пример (добавление и фикс свойства _orientation_):

\[javascript\] jQuery.event.fixHooks.orientationchange = jQuery.event.fixHooks.resize = { props: \["orientation"\], filter: function normalizeOrientation(event, original) { if (event.orientation) { if (\[0, "0", 180, "180", "portrait"\].indexOf(event.orientation)) { event.orientation = "portrait"; } else { event.orientation = "landscape"; } } else { var win = jQuery(window); event.orientation = win.width() &gt; win.height() ? "landscape" : "portrait"; } return event; } } \[/javascript\]

Живой пример [тут](https://jsfiddle.net/STEVER/tx9dppqq/ "jsfiddle").

Более подробно можно почитать официальную документацию спрятанную [тут](https://learn.jquery.com/events/event-extensions/).
