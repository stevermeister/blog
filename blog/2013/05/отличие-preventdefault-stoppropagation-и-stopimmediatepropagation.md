---
title: "Отличие preventDefault, stopPropagation и stopImmediatePropagation"
tags: "javascript,jQuery,Хочу сделать мир лучше"
date: "2013-05-13"
---

Небольшая заметка о том, чем отличаются между собой **JavaScript** методы **preventDefault**, **stopPropagation** и **stopImmediatePropagation**.

Начнем с того, что большая часть разработчиков вобще не заморачивается такими вопросами и просто возвращает **false** в колбэке, когда нужно остановить дальнейшее выполнение, т.е.:

$('a').click(function(){
	# some code
	return false;
});

Вроде бы все хорошо, но понимаете ли вы что происходит за ширмой, когда вы кликаете по ссылке? Первое - да, вы добились своей цели, вы предотвратили посещение ссылки( тут сработал **event.preventDefault()** метод), но вы также остановили распространение(propagation) события ( по сути выполнили **event.stopPropagation()** ) и теперь **callback**\-фунция возвращает **false**.

Итак, как вы уже поняли, такой способ увеличивает коэффициент кривизны кода.

Если вы всего лишь хотите предотвратить действие браузера по умолчанию, то вам следует использовать **preventDefault** метод:

$('a').click(function(event){
	# some code
	event.preventDefault();
});

Идем дальше. Что такое **stopPropagation**? Проще будет разобраться на примере. Допустим что у нас есть такая структура HTML:

<div id="demo">
    <a href="js4.it">Link</a>
</div>

И два обработчика:

$('a').click(function(event){
	event.preventDefault();
	event.stopPropagation();
	console.log('You have clicked the link.');
});

$('#demo').click(function(){
	$(this).toggleClass('yellow');
	console.log('You have clicked the demo div.');
});

Можем убедиться в том, что при клике на ссылку цвет блока не изменяется на желтый и сам обработчик не вызывается. А все благодаря методу **stopPropagation()**, который **останавливает** **всплытие** (**bubbling**) события "клик" к родительским элементам.

[Вот](https://jsfiddle.net/STEVER/7TSkG/ "jsfiddle") пример полностью. Если мы уберем оттуда **stopPropagation()**, то сможем убедиться, что все работает.

А что такое **stopImmediatePropagation()**? и чем отличается от **stopPropagation()**?Сразу [пример](https://jsfiddle.net/STEVER/8jRyd/ "jsfiddle") в ответ. Как видим ****stopImmediatePropagation**()** останавливает не только всплытие события по родительским элементам, но также останавливает работу всех последующих обработчиков конкретного события на данном элементе.

Данный пост был составлен на основании статьи [Quick Tips:event.preventDefault() and event.stopPropagation and event.stopImmediatePropagation](https://dev-tricks.com/event-preventdefault-and-event-stoppropagation-and-event-stopimmediatepropagation/), которая была переведена и переработана.
