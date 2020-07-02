---
title: "jQuery: click + ctrlKey"
tags: "javascript,jQuery"
date: "2013-03-26"
---

Иногда возникает необходимость триггерить **клик**, при котором нажата какая-либо клавиша(например **Ctrl**). Делается это довольно просто:

var event = jQuery.Event("click"); 
event.ctrlKey = true; 
jQuery(element).trigger(event);
