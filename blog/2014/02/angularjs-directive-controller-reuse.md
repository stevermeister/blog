---
title: "AngularJS: Использование контроллера директивы в другой директиве"
tags: "AngularJs,controller,directive,javascript"
date: "2014-02-14"
---

Опция **require** в описании **директивы** дает нам возможность использовать **контроллер** другой директивы. Мы также можем указать массив контроллеров.

Объяснение можно посмотреть на [egghead.io](https://egghead.io/lessons/angularjs-directive-to-directive-communication), код можно взять [тут](https://github.com/msfrisbie/egghead-angularjs/blob/master/app/lessons/15/main.js "github").

**Важно**: если поставить в начале значения символ '^',  то интерпретатор будет пытаться найти контроллер директивы в **родительских** элементах. Если не поставить - только на **текущем** елементе(_как это было в примере на egghead.io_).
