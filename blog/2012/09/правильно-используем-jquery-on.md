---
title: "Правильно используем jQuery ON"
tags: "javascript,jQuery,Хочу сделать мир лучше"
date: "2012-09-18"
---

Делаю репост части [статьи с харбра](https://habrahabr.ru/post/129613/), к которой не раз обращался.

bind, live и delegate могли вести себя непредсказуемо при использовании вместе. Например, $(document).unbind('click') убирал все live('click')-события со всего документа. Новое API событий **.on()** and **.off()** призвано как-то унифицировать систему создания обработчиков событий:

Старое API

Новое API

$(elems).bind(events, fn)

$(elems).on(events, fn)

$(elems).bind(events, { mydata: 42 }, fn)

$(elems).on(events, { mydata: 42 }, fn)

$(elems).unbind(events, fn)

$(elems).off(events, fn)

$(elems).delegate(events, selector, fn)

$(elems).on(events, selector, fn)

$(elems).undelegate(events, selector, fn)

$(elems).off(events, selector, fn)

$(selector).live(events, fn)

$(document).on(events, selector, fn)

$(selector).die(events, fn)

$(document).off(events, selector, fn)
