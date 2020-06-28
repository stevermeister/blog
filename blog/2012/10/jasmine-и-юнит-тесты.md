---
title: "Jasmine и юнит тесты"
tags: "jasmine,javascript,Хочу сделать мир лучше"
date: "2012-10-11"
---

![](images/jasmine_logo.png "jasmine_logo")

Jasmine на данный момент одна из самым популярных библиотек для организации юнит тестирования JavaScript.

На официальном сайте есть довольно хороший [быстрый старт](https://pivotal.github.com/jasmine/) с примерами, но если все же хочется на русском и с комментариями - то добро пожаловать под кат.

Первым делом скачиваем себе библиотеку с [офсайта](https://github.com/pivotal/jasmine/downloads). Далее создаем себе [песочницу](https://jsfiddle.net/STEVER/HVPRB/ "вот готовая, если лень создавать ;)") для экспериментов. Вместе с библиотекой сразу идет пример использования, но возможно сходу разобраться в нем будет не просто. Более простая версия будет выглядеть так:

<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="jasmine.css">
  <script type="text/javascript" src="jasmine.js"></script>
  <script type="text/javascript" src="tests.js"></script>
  <script type="text/javascript">
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.specFilter = function(spec) {
        console.log(spec);
      };
      window.onload = function() {jasmineEnv.execute();};
  </script>
</head>
<body></body>
</html>

tests.js - файл, в котором мы опишем наши тесты

jasmine.getEnv - аналог синглтона для получения основного объекта

jasmineEnv.specFilter - callback для получения результатов

Сразу модуль для рендера результатов(jasmine-html.js) и подключим его. Итоговый код будет такой:

<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="jasmine.css">
  <script type="text/javascript" src="jasmine.js"></script>
  <script type="text/javascript" src="jasmine-html.js"></script>
  <script type="text/javascript" src="tests.js"></script>
  <script type="text/javascript">
      var jasmineEnv = jasmine.getEnv();
      var htmlReporter = new jasmine.HtmlReporter();
      jasmineEnv.addReporter(htmlReporter);
      jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
      };

      window.onload = function() {jasmineEnv.execute();};
  </script>
</head>
<body></body>
</html>

Песочница есть, теперь можем переходить к экспериментам в tests.js:

describe("Jasmine", function() {
  it("makes testing JavaScript awesome!", function() {
    expect(true).toBe(true);
  });
});

describe - описание блока тестов

it - описание теста

\* describe может включать в себя другой describe (если нужны подсекции)

далее идет сам тест:

expect(true).toBe(true);

понятное дело, что вместо _true_ тут будет 2 выражения, которые должны быть равны. Какие еще могут быть варианты для сравнения?

expect(true).not.toBe(true);

expect(a).toEqual(b);

Отличие **toEqual** от **toBe** в том, что toBe - это строгое ссылочное сравнение (для объектов _a = b = {}_ ), а в случае с toEqual - сравнение по содержимому( _a = {}, b = {}_ ). Во втором случае toBe вернет **fail**.

Также возможны варианты для нахождение совпадений подстроки:

var message = 'foo bar baz';

expect(message).toMatch(/bar/);
expect(message).toMatch('bar');
expect(message).not.toMatch('bar');

Либо нахождения свойства в объекте:

var a = { foo: 'foo' };

expect(a.foo).toBeDefined();
expect(a.bar).not.toBeDefined();

Варианты проверки null и undefinded:

expect(a).not.toBeUndefined();
expect(b).toBeUndefined();

expect(a).toBeNull();
expect(b).not.toBeNull();

Аналогично работают методы: toBeTruthy, toBeFalsy, toContain(проверяет наличие значение в массиве), toBeLessThan, toBeGreaterThan, toBeCloseTo.

Если мы захотим проверить имя класса конструктора( аналог instanceof):

expect({}).toEqual(jasmine.any(Object));
expect(12).toEqual(jasmine.any(Number));

Также есть метод проверки исключений:

var foo = function() {
  return 1 + 2;
};
var bar = function() {
  return a + 1;
};

expect(foo).not.toThrow();
expect(bar).toThrow();

В группе тестов мы можем использовать инструкции **beforeEach** и **afterEach**, в которых мы указываем что нужно выполнить до/после каждого теста:

describe("A spec", function() {
  var foo;

  beforeEach(function() {
    foo = new Object;
  });

  afterEach(function() {
    foo = null;            expect(bar).toBeNull();
  });

  it("first test", function() {
    expect(foo).toEqual(1);
  });

  it("second test", function() {
    expect(foo).toEqual(1);
  });

Группы и тесты обладают интересной особенностью, если мы поставим перед _describe_ или _it_ символ _x_, т.е. **x_describe_** и **_xit_**, то они будут проигнорированы. (При этом ошибка о том, что метод не найден, вызвана не будет)

Еще с помощью Jasmine мы можем выставлять **наблюдателей**(observer) на разные объекты с помощью метода **spyOn**:

beforeEach(function() {
    spyOn(foo, 'setBar');expect({}).toEqual(jasmine.any(Object)); expect(12).toEqual(jasmine.any(Number));
            expect(bar).toBeNull();
    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

После чего станут доступны следующие проверки:

expect(foo.setBar).toHaveBeenCalled();
expect(foo.setBar.calls.length).toEqual(2);
expect(foo.setBar).toHaveBeenCalledWith(123);
expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
expect(foo.setBar.mostRecentCall.args[0]).toEqual(456);
expect(foo.setBar.calls[0].args[0]).toEqual(123);

Для метода **spyOn** существует ряд надстроек:

spyOn(foo, 'getBar').andCallThrough(); // продолжаем выполнение основной функции
spyOn(foo, 'getBar').andReturn(745); // подменяем возвращаемое значение
spyOn(foo, 'getBar').andCallFake(function() {return 1001;}); // подменяем метод

и более сложные:

setBar = jasmine.createSpy('setBar');
foo = jasmine.createSpyObj('foo', ['setBar']);

По сути тоже самое что и spyOn(foo, 'setBar'), только тут мы можем создавать наблюдатель на функцию(как в первом случае), а не на метод объекта и делать это динамически(формируя название функции).

В случае, когда мы должны произвести тест через некоторое время после запуска тестируемого кода, на помощь нам приходит метод **jasmine.Clock**( аналог setTimeOut):

var timerCallback;
beforeEach(function() {
    timerCallback = jasmine.createSpy('timerCallback');
    jasmine.Clock.useMock();
  });

it("causes a timeout to be called synchronously", function() {
    setTimeout(function() {
      timerCallback(); // это функция выполнится через 100мс
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled(); // еще не выполнилась

    jasmine.Clock.tick(101); // ждем 101 мс

    expect(timerCallback).toHaveBeenCalled(); // уже должна была выполниться
  });

 

А сейчас разберем самое сложное место во всей библиотеке - **асинхронные** тесты, которые по моему мнению очень слабо разобраны в примерах на официальном сайте. Создаются они с помощью очередей организованных через методы **runs**() и **waitsFor**().  В метод **runs**() мы передаем наши асинхронные действия, а в **waitsFor**() прописываем условие, по которому мы узнаем что асинхронное действие завершено - обычно для этого используется глобальная переменная, как флаг. Допустим у нас есть асинхронный метод:

function asynchFunc(value, callback){
  setTimeout(function() {  //через 0.5с он
    value++;   // изменит значение
    callback(value); // и вернет его через callback
  }, 500);
}

Теперь напишем тест для него:

describe("Asynchronous specs", function() {
    var value, flag;

    it("async test", function() {
        runs(function() {
            flag = false;  // начальные значения
            value = 0;
            asynchFunc(value, function(x){
                value = x;
                flag = true;  // указывает на то что тест выполнен
            });
        });

        waitsFor(function() {
            return flag; // ждет когда флаг переключится в true
        }, "Message for timeout case", 750);
        // после выполняет следующий блок кода
        runs(function() {
            expect(value).toBeGreaterThan(0);
        });
    });
});

Метод waitsFor имеет следующий синтаксис:

waitsFor(conditionCallback, TimeOutMessage, TimeOut)
conditionCallback - функция возвращающая true/false, она постоянно вызывается методом waitsFor пока не вернет true либо наступит TimeOut
TimeOut - максимально время работы метода в мс
TimeOutMessage - сообщение по приходу TimeOut

Итак еще раз: мы помещаем наши асинхронные действия в метод runs() и при выполнении этого действия меняем флаг, а в waitsFor() помещаем функцию, которая будет возвращать этот самый флаг. Причем тут может быть как один флаг, так и гораздо более сложные проверки (например, если у нас идет несколько асинхронных вызовов).

Полный пример в [песочнице](https://jsfiddle.net/STEVER/HVPRB/3/ "asynch test").

Желаю вам успешно пройденных тестов!
