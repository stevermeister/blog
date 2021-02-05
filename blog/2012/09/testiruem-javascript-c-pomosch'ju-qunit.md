---
title: "Тестируем JavaScript c помощью QUnit"
tags: "javascript,QUnit"
date: "2012-09-25"
slug: "тестируем-javascript-c-помощью-qunit"
---

![](images/qunit_logo.png "qunit_logo")

Отбросив все объяснения **зачем** писать юнит-тесты, перейдем сразу к рассмотрению вопроса **как** их писать с помощью [QUnit](https://qunitjs.com).

Для начала скачаем последнюю версию библиотеки с официального сайта(она содержит в себе 2 файла js и css) и создадим обычных HTML файл, в котором будем выполнять наши тесты:

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit Example</title>
  <link rel="stylesheet" href="qunit.css">
</head>
<body>
  <div id="qunit"></div>
  <script src="qunit.js"></script>
  <script src="tests.js"></script>
</body>
</html>

Файл tests.js с описанием тестов:

QUnit.test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

Запустим HTML файл и посмотрим что у нас получилось.

Разберем этот пример более подробно: QUnit.test - метод, который вызывает тест для определенного функционала, имеет следующий синтаксис:

QUnit.test( checkFunctionName, callback)

причем, каждый функциональный тест может включать в себя множество подтестов-условий, например:

QUnit.test( "hello test", function() {
  ok( 0 == "0", "Passed!" );
  ok( 1 == "1", "Passed!" );
  ok( 2 == "2", "Passed!" );
 });

Кроме этого мы можем объединять тесты в **группы**, следующим образом:

module( "group digits" );
QUnit.test( "chech zero", function() {
    ok( 0 == "0", "Passed!" );
}
QUnit.test( "chech one", function() {
    ok( 1 == "1", "Passed!" );
}

Также QUnit позволяет нам проводить **асинхронные** тесты, для этого обрамляем условие в метод QUnit.**asyncTest** и вызвать метод start(), когда когда действие выполнится:

QUnit.asyncTest( "asynchronous test: one second later!", function() {
  setTimeout(function() {
    ok( true, "Passed and ready to resume!" );
    start();
  }, 1000);
});

Кроме метода start() для асинхронной работы еще есть и метод stop() - для случая когда нам снова необходимо дождаться отработки асинхронного модуля.

Теперь пройдемся по методам с помощью которых мы создаем **условия**:

ok( state, message ); //проверят что первое TRUE
equal(actual, expected, message);// ==
strictEqual( actual, expected, message ); // ===
deepEqual( actual, expected, message ); // === в составном типе
throws( block, expected, message ); // для теста exceptions

Также с помощью метода **expect**(), мы можем уточнить сколько проверок ожидаем сделать в рамках одного теста:

QUnit.asyncTest( "asynchronous test: one second later!", function() {
  expect(1);
  setTimeout(function() {
    ok( true, "Passed and ready to resume!" );
    start();
  }, 1000);
});

и тест будет не пройден, если итоговое число проверок не соответствует заданному.

Библиотека позволяет навешивать **callback**_функции на различные действия begin, done, log, moduleDone, moduleStart, testDone, testStart:

QUnit.begin(function(){ //do something });

QUnit дает возможность конфигурировать некоторые параметры через QUnit.config:

QUnit.config.reorder = false;

 

И напоследок бонус - то, чего я не нашел в инете - цепочка асинхронных вызовов. На [хабре](https://habrahabr.ru/post/83170/) предложили такой вариант решения:

asyncTest('asynctest', function () {
  // Pause the test
  expect(3);

  $.get(function () {
    // асинхронные проверки
    ok(true);
  });

  $.get(function () {
    // другие асинхронные проверки
    ok(true);
    ok(true);
  });

  setTimeout(function () {
    start();
  }, 2000);
});

Т.е. ждать 2 секунды, а потом проверять. Сомнительное решение, которое не будет работать, если суммарное время асинхронных вызовов будет больше чем 2 секунды. Может оно конечно так и задумывалось?

Попробуем его немного переделать, так чтобы не нужно было привязываться к конкретному времени ожидания:

asyncTest('asynctest', function () {
  // Pause the test
  expect(3);
  var asyncNumberLeft = 2;
  function checkEnd(){
    asyncNumberLeft--;
    if(asyncNumberLeft === 0){
       start();
    }
  }

  $.get(function () {
    // асинхронные проверки
    ok(true);
    checkEnd();
  });

  $.get(function () {
    // другие асинхронные проверки
    ok(true);
    ok(true);
    checkEnd();
  });

});

Но если мы действительно хотим добавить какой-то лимит по времени выполнения, то таймаут следует оставить.
