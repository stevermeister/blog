---
title: "Памятка о наследовании в JavaScript"
tags: "javascript,Хочу сделать мир лучше"
date: "2012-09-27"
---

Так как все больше приходится удалятся от чистого языка к фреймворкам - решил написать себе памятку по возможным паттернам наследования в JavaScript.

Итак как мы можем наследовать свойства одного объекта в другом. Самый простой способ это сделать apply родительского конструктора в дочернем:

// родительский "класс"
function Menu(id){
}

// дочерний класс
function MenuChild(){
  Menu.apply(this, args); //вызываем конструктор родителя 
  this.open = function(){} // определяем или переопределяем свойства
}

Можно наследовать сразу готовые **объекты**(а не их конструкторы) используя выстроенное свойство **\_\_proto\_\_**:

var animal = {"eats": true};
var rabbit = {"jumps": true};
rabbit.\_\_proto\_\_ = animal;
alert(rabbit.eats);

Для браузеров, которые не поддерживают свойство **\_\_proto\_\_**, можно сделать так:

var animal = {"eats": true};
var rabbit = {"jumps": true};
rabbit = Object.create(animal);
alert(rabbit.eats);

Наследование с использованием свойства **prototype**:

var animal = {"eats": true};
function Rabbit(){}
Rabbit.prototype = animal;
var rabbit = new Rabbit;
alert(rabbit.eats);

И **универсальный** вариант наследования через специальную функцию:

function inherit( proto ){
  function F(){}
  F.prototype = proto;
  var object = new F;
  return object;
}
