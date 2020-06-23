---
title: "Delayed Keypress или создаем свои хуки событий на jQuery"
tags: "javascript,jQuery,jQuery.event,keypress,Хочу сделать мир лучше"
date: "2014-06-14"
---

Иногда возникает необходимость расширить стандартное событие **JavaScript**/**jQuery**, добавить определенную специфику, например: мы хотим выводить авто-дополнение для текстового поля при вводе, при этом мы не хотим чтобы запрос отправлялся на сервер при каждом нажатии клавиши(будет очень много ненужных запросов). Зададимся целью посылать запрос через 500 миллисекунд (полсекунды) после того, как пользователь прекратит набирать(либо остановился в ожидании подсказки авто-дополнения).

Если не создавать своего события, а просто обработать **keypress**, то получим где-то такой код:

\[javascript\] $(function() { var timer; $("#id").keypress(function() { timer && clearTimeout(timer); timer = setTimeout(someMethod, 500); }); }); \[/javascript\]

Теперь попробуем создать свое событие **delayedkeypress**, обработчик которого можно будет повесить на любой элемент DOM.

**jQuery** имеет следующий синтаксис для определения своих событий:

\[javascript\] jQuery.event.special.myevent = { delegateType: 'eventType', bindType: 'eventType', setup: function( data, namespaces, eventHandle ) { // code }, teardown: function( namespaces ) { // code }, add: function( handleObj ) { // code }, remove: function( handleObj ) { // code }, \_default: function( event ) { // code }, trigger: function( event: jQuery.Event, data: Object ) { // code }, handle: function( event: jQuery.Event, data: Object ){ // code } }; \[/javascript\]

Немного пояснений по свойствам и колбэкам:

- **bindType** - тип стандартного события(если такое имеется), к которому хотим привязаться
- **delegateType** - какому типу события делегируем последующее выполнение
- **setup** - вызовется при первом навешивании обработчика
- **teardown** - когда все обработчики сняты
- **add**/**remove** - при каждом добавлении/удалении нового обработчика
- **trigger** - вызовется при использовании методов **.trigger()** и **.triggerHandler()**
- **\_default** - определяет нужно ли запускать стандартный обработчик браузера
- **handle** - основной метод, который будет вызван при обнаружении события определенного в **bindType** опции

Если мы хотим просто прокинуть стандартный **keypress** через свой обработчик, получим:

\[javascript\]jQuery.event.special.delayedkeypress = { delegateType: "keypress", bindType: "keypress", handle: function (event) { return event.handleObj.handler.apply(this, arguments); } };\[/javascript\]

а теперь добавим нашу обработку c таймером:

\[javascript\] jQuery.event.special.delayedkeypress = { delegateType: "keypress", bindType: "keypress", handle: function (event) { var self = this; this.timer && clearTimeout(this.timer); this.timer = setTimeout(function(){ event.handleObj.handler.apply(self, arguments); }, 500); } }; \[/javascript\]

это позволит нам превратить первоначальный код в простой отлов события:

\[javascript\]$("#id").on("delayedkeypress", someMethod);\[/javascript\]

ну и для полной jquery-ности добавим алиас-метод **delayedkeypress** для быстрой работы с событием(аналогично _click()_, _focus()_, _scroll()_):

\[javascript\] jQuery.fn\[ "delayedkeypress" \] = function( data, fn ) { return arguments.length > 0 ? this.on( "delayedkeypress", null, data, fn ) : this.trigger( "delayedkeypress" ); };\[/javascript\]

получим:

\[javascript\]$("#id").delayedkeypress(someMethod);\[/javascript\]

Вот [тут](http://jsfiddle.net/STEVER/y5R5V/ "jsfiddle") можно поиграть с кодом. Более подробную информацию можно найти в [исходниках](https://github.com/jquery/jquery/blob/master/src/event.js "event.js").
