---
title: "Создаем юнит-тесты с phantomjs"
tags: "javas,phantomjs,Хочу сделать мир лучше"
date: "2012-09-29"
---

![](images/phantomjs_logo-277x300.png "phantomjs_logo")

Для начала скажу что **phantomjs** - это совсем не библиотека для юнит-тестов, как вы могли подумать; **phantomjs** - это возможность работать с WebKit из консоли используя JavaScript и без браузера.

Интересно? Тогда идем под кат.

 

Сначала проверим как работает phantomjs.

Для установки скачиваем программу с [официального сайта](https://phantomjs.org/download.html). Стоит отметить что есть версии для Windows, Mac и Linux. Я буду описывать вариант для Linux, для которого можно запускать приложение(начиная с версии 1.5) из консоли. В скачанном архиве оказалось всего 2 папки - исполняемый файл и примеры.

В "быстром старте" нам предлагают создать hello.js со следующим содержанием

console.log('Hello, world!');
phantom.exit();

и выполнить его:

phantomjs hello.js

Очень важно в конце выполнения вызывать phantom.exit();

Попробуем разобрать более сложные пример с загрузкой страницы и получением ее скриншота:

var page = require('webpage').create();
page.open('https://google.com', function () {
    page.render('google.png');
    phantom.exit();
});

После чего в текущей директории должен появится файл google.png, в котором будет снимок сайта.

Далее рассмотрим скрипт для определения времени загрузки страницы:

var page = require('webpage').create(),
    t, address;

if (phantom.args.length === 0) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit();
}

t = Date.now();
address = phantom.args[0];
page.open(address, function (status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        t = Date.now() - t;
        console.log('Loading time ' + t + ' msec');
    }
    phantom.exit();
});

Кстати в официальной документации в этом скрипте ошибка: зачем-то в if блоке стоит return. Чтобы запустить скрипт вторым параметром(после имени скрипта) ставим адрес сайта, который хотим проверить (обязательно с https://)

По умолчанию JavaScript код страницы, которую мы загружаем не выполняется, но мы это можем сделать в режиме песочницы через метод evaluate:

var page = require('webpage').create();
url = phantom.args[0];

page.onConsoleMessage = function (msg) {
    console.log(msg);
};
page.open(url, function (status) {
    var title = page.evaluate(function () {
        //return document.title;
        console.log(some\_variable);
    });
    phantom.exit();
});

Также мы можем просматривать запрашиваемые/получаемые страницей ресурсы задав callback методы onResourceRequested и onResourceReceived:

page.onResourceRequested = function (request) {
    console.log('Request ' + request.contentType + ' ' + request.url);
};
page.onResourceReceived = function (response) {
    console.log('Receive ' + response.contentType + ' ' + response.url);
};

Request и responce - json объекты, в которые хранятся данные о запросе и ответе.

С основами **phantomjs** разобрались, теперь определим, как он нам может помочь в написании тестов.

Есть 2 подхода: основной и тот, который мы только что придумали для решения своей частной задачи. Основной заключается в том, чтобы запустить на выполнение юнит тест страничку в **phantomjs**, а потом считать с результирующей таблички данные и как-то их обработать. Этот подход хорошо разобран [тут](https://habrahabr.ru/post/116789/), [тут](https://habrahabr.ru/post/135979/) и [тут](https://github.com/ariya/phantomjs/blob/master/examples/run-qunit.js) оф пример. Поэтому на нем не останавливаемся, а переходим к нашему изощренному: мы хотим проверить правильно ли были применены стили и изменения структуры к документу. Для этого мы делаем снимок экрана эталонного варианта, потом применяем стили к базовой страничке, опять делаем снимок и сравниваем полученные скрины.

Логика на стороне phantomjs выглядит следующим образом:

//массив тестов
var tests = [ "test1", "test2", "test3", "test4", "test5"];
var pages = [];
// в цикле по ним проходим
for(var i in tests ){
    // получаем ссылку на тест
    var url = host + '#!runtest/' + tests[i];
    page = require('webpage').create()
    pages.push(page);
    // открываем-выполняем страницу теста
    pages[i].open(url,
        (function(testName, page){
            return function(){
                setTimeout(function(){
                     // по таймауту ренедерим страницу в png-base64
                     // и сравниваем с эталонным значением
                     equal(page[i].renderBase64('PNG'), expected[testName], testName + " - OK");
                }, 2000);
            };
        })(tests[i], pages[i])
     );
}

попрошу обратить внимание так как мы используем цикл с внесением значений в callback-метод нам необходимо создать дополнительное замыкание для сохранения значений:

(function(testName, page){

 

Посмотрим как система покажет себя в бою...
