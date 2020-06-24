---
title: "Наследование в CanJS"
tags: "canjs,javascript,Хочу сделать мир лучше"
date: "2012-09-15"
---

![](images/canjs_logo.png "canjs_logo")

Для начала скажу что [CanJs](https://canjs.us/), это форк от [JavaScriptMVC](https://javascriptmvc.com/), который был разобрал вот [тут](https://stepansuvorov.com/blog/2012/09/%D1%80%D0%B0%D0%B7%D0%B1%D0%BE%D1%80-javascriptmvc/).

Так вот, разбирая наследование контроллеров во фреймворке, не сразу поняли как оно работает. Пример в официальной документации был не очевиден, а гугление не дало быстрого ответа.

Все конечно же оказалось просто, но дошли мы к этому не сразу. Надеюсь этот посто облегчит жизнь тем, кто столкнется с аналогичным вопросом.

Итак, пример. Для начала создадим родительский класс, с методом, который уначледуется, и свойством, которое будет переопределено:

var Parent = can.Control({
    name:'parent',
    showName: function(){ alert(this.name) }
})

Теперь внимание - дочерний класс мы создаем уже не через can.Control, через уже существующий класс Parent:

var Child = Parent({
    param:'child'
})

Теперь создадим объекты и вызовем в каждом из них наш метод:

var parent = new Parent('#parent');
var child = new Child('#child');
parent.showName();
child.showName();

Поддерживается цепочное наследование, т.е. мы дальше можем получать наслдеников от Child:

var SubChild = Child({
    param:'subchild'
})

События, а точнее обработчики событий, тоже наследуются. Что изначально было подвергнуто сомнению.

Итоговый код:

var Parent = can.Control({
    param:'parent',
    showName: function(){ alert(this.param) },
    'click': function(){ this.showName() }
})

var Child = Parent({
    param:'child',
})

var SubChild = Child({
    param:'subchild',
})

var parent = new Parent('#parent');
var child = new Child('#child');
var subchild = new SubChild('#subchild');

Поиграться с ним можно вот [тут](https://jsfiddle.net/zXeyJ/10/).
