---
title: "Пишем jQuery c нуля. Часть1"
tags: "javascript,jQuery,Хочу сделать мир лучше"
date: "2015-03-17"
---

![djQuery](images/0_9229e_6f7e1115_orig.png)

Начинаю новую рубрику статей посвященных внутренностям **jQuery**. Материал должен стать полезен как начинающим **JavaScript**/**jQuery** разработчикам, так и опытным специалистам. Шаг за шагом мы воссоздадим функциональность самой популярной на сегодняшний день библиотеки.

Специально для этого я создал [репозиторий](https://github.com/stevermeister/djQuery "https://github.com/stevermeister/djQuery") на gitHub(с кодовым именем **djQuery**), где буду выкладывать код рубрики:

[shell] git clone git@github.com:stevermeister/djQuery.git cd djQuery git checkout step-1 [/shell]

Ну что начнем?

_\- Что представляет из себя jQuery?_ _\- Это функция._ _\- какие принимает параметры?_ _\- селектор, ну и что-то еще может_

Отлично, тогда напишем такой базовый код:

[javascript] var djQuery = function(selector, content){ }; [/javascript]

Пока вроде все понятно.

Еще сразу, для красоты модульной, завернем все в самовыполняющуюся функцию:

[javascript] (function(w){ var djQuery = function(selector, content){ };

w.$ = w.djQuery = djQuery; })(window); [/javascript]

и внутрь передали объект window и импортировали в него ссылку на нашу функцию(плюс привычный $ - алиас).

Думаю для первой части хватит. Код можно взять по тегу [step-1](https://github.com/stevermeister/djQuery/tree/step-1 "github.com").

git checkout step-1

Больше кода обещаю во второй части ;)
