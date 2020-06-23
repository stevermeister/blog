---
title: "Паттерны в JavaScript. Singleton"
tags: "javascript,patterns,паттерны,Хочу сделать мир лучше"
date: "2014-02-26"
---

Развивая успешно заброшенную [тему разбора паттернов JavaScript](http://stepansuvorov.com/blog/2013/06/javascript-patterns/).

Итак [Singleton](http://ru.wikipedia.org/wiki/%D0%9E%D0%B4%D0%B8%D0%BD%D0%BE%D1%87%D0%BA%D0%B0_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), он же Одиночка.

Разберемся что нам нужно для создание такого "класса", который будет возвращать всегда один и тот же экземпляр. Это как минимум статическая переменная **instance** для хранения объекта и метод возвращающий этот объект **getInstance()**.

У нас должно получиться что-то такое:

var object1 = mySingleton.getInstance();
var object2 = mySingleton.getInstance();
console.log( object1 === object2 ); // true

В **JavaScript** есть 2 способа эмуляции статической переменной: используя свойство самого объекта и через замыкание. Разберем оба способа.

## Создание статической переменной через свойство объекта

mySingleton.instance

Исходя из этого реализации синглтон патерна будет следующая:

var mySingleton = {
    getInstance: function () {
      if ( !mySingleton.instance )
        mySingleton.instance = {x:Math.random()};
      }
      return mySingleton.instance;
    }
  };

В данном случае {x:Math.random()} - наш экземпляр. Вместо статического задания мы можем использовать функцию:

function init(){
    return {x:Math.random()};
}

var mySingleton = {
    getInstance: function () {
      if ( !mySingleton.instance )
        mySingleton.instance = init();
      }
      return mySingleton.instance;
    }
  };

## Создание статической переменной используя замыкание

var mySingleton = (function(){
  var instance;
  return {
    getInstance: function () {
      if ( !instance ) {
        instance = {x:Math.random()};
      }
      return instance;
    }
  }
})();

в этом варианте переменная **instance** хранится в замыкании созданом анонимной самовызывающейся функцией.

## Публичные и приватные свойства

**Публичные свойства** в обоих случая добавляются довольно просто: в свойсва объекта, который возвращаем:

function init(){
    return {
        publicMethod1: function(){ ... }
        publicMethod2: function(){ ... }
    };
}

 **Приватные свойсва** можем сэммитировать только используя замыкание:

var mySingleton = (function(){
  var instance;
  function privateMethod(){
      //...
  }
 var privateProperty = 5;
 return {
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  }
})();

 

## Гарантия уникальности

Так как **mySingleton** не является функцией, то мы не можем применить к нему оператор **new**. и должны получать объект всегда через **getInstance** метод.

 

Вот [песочница](http://jsfiddle.net/STEVER/NE8Da/ "jsfiddle"), где можно поиграться с полным примером.
