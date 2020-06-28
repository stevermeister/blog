---
title: "setTimeout может содержать больше 2х параметров"
tags: "javascript,setTimeout,Хочу сделать мир лучше"
date: "2013-06-26"
---

Никогда не задумывался на тем, что есть альтернативный синтаксис использования метода **setTimeout**:

var timeoutID = window.setTimeout(func, delay, [param1, param2, ...]);

_param1, param2_ - параметры, которые передадутся в функцию _func,_ пример_:_

setTimeout(alert, 5000, "YES")

только в IE версии < 10 это не поддерживается. Но можно переопределить метод, как предложено [тут](https://developer.mozilla.org/en-US/docs/Web/API/window.setTimeout).

 

_P.S.: [Сергей](https://www.ilinsky.com/), спасибо за тему._
