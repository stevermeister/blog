---
title: "Утилита для тестирования CasperJS"
tags: "casperjs,javascript,phantomjs,Хочу сделать мир лучше"
date: "2012-10-21"
---

![](images/casperJS_logo.png "casperJS_logo")

**CasperJS** - вспомогательный инструмент написанный на JavaScript как обертка [**PhantomJS**](https://phantomjs.org/). На официальном сайте перечислены следующие основные возможности:

- определение и порядок итераций браузера
- заполнение и отправка форм
- клик и переход по ссылкам
- создание скриншотов страницы и ее части
- удаленное тестирование DOM
- логирование событий
- загрузка ресурсов и подключение библиотек
- написание функциональных тестов и сохранение в формате JUnit XML
- Допиливание веб контента

Все это или почти все можно сделать с помощью PhantomJS, погрузимся глубже в CasperJS, чтобы понять все плюшки.

Для начала немного о том, как нам установить CasperJS. Скачиваем архив с [офсайта](https://casperjs.org) либо выкачиваем файлы с [github](https://github.com/n1k0/casperjs). Создаем ссылку на исполняемый файл в /usr/local/bin:

$ ln -sf \`pwd\`/bin/casperjs /usr/local/bin/casperjs

После чего можно проверить работоспособность фантома(который как бы уже должен быть установлен) и каспера:

$ phantomjs
--version 1.7
$ casperjs
--version 1.0.0-RC2

\* Еще плюс нужно проверить наличие Python на машине, так как исполняемый файл именно на нем.

Сделаем простенький скриптик, чтобы проверить что модуль подключается:

var casper = require('casper').create();
 casper.start('https://ya.ru/', function(){ console.log("ya.ru OK!"); });
 casper.run();

Если все работает, то можно переходить к плюшкам.

Первая вкусная плюшка - это удобный синтаксис для работы с **асинхронными** **методами**. Для того чтобы в фантоме открыть несколько страниц последовательно нужно было делать так:

var page = require('webpage').create();
page.open(url1, function(status) {
  if (status == "fail") phantom.exit();
  page.open(url2, function(status) {
    if (status == "fail") phantom.exit();
    page.open(url3, function(status) {
      if (status == "fail") phantom.exit();
      page.open(url4, function(status) {
        if (status == "fail") phantom.exit();
        // И так далее...
      });
    });
  });
});

В свою очередь на **CasperJS** это выглядит так:

var casper = require('casper').create();
casper.start(url1);
casper.thenOpen(url2);
casper.thenOpen(url3);
casper.thenOpen(url4);
casper.run();

Согласитесь, что намного приятнее?

Следующая плюшка - это **клики по DOM элементам**, т.е. имитация пользовательских действий:

var casper = require("casper").create()

casper.start('https://stepansuvorov.com/blog/');
casper.thenClick('#site-title');
casper.thenClick('.page-item-2');
casper.then(function() {
    this.echo('Page url is ' + this.getCurrentUrl());
    this.echo('Page title is ' + this.getTitle());
});

casper.run();

Идем дальше. Плюшка номер три - это удобный интерфейс для **заполнения форм**:

var casper = require("casper").create()

casper.start('https://ya.ru/', function() {
  this.fill('form[action="https://yandex.ru/yandsearch"]', { text: 'casperjs' }, true);
});

casper.then(function() {
    this.echo('Page url is ' + this.getCurrentUrl());
    this.echo('Page title is ' + this.getTitle());
});

casper.run();

Четвертая плюшка - **скрин определенного участка** страницы, напомню: фантом умел только делать снимок всей страницы:

var casper = require("casper").create()

casper.start('https://www.google.com', function() {
    this.captureSelector('capture.png', '#hplogo');
});

casper.run();

Пятая плюшка - **функциональные тесты** - как объединение имитации действий пользователя и проверки соответствий состояний страницы:

var url = 'https://ya.ru/';
var casper = require('casper').create();
casper.start(url, function() {
  this.test.assert(this.getCurrentUrl() === url, 'url is the one expected');
});
casper.run();

И в завершение еще плюшка отслеживания подгрузки контента(в случае когда он грузится асинхронно)

var casper = require("casper").create();

casper.start('https://foo.bar/', function() {
  this.waitForResource("foobar.png");
}); 

casper.then(function() {
  this.echo('foobar.png has been loaded.');
}); 

casper.run();

Аналогичные методы:  `wait`, `waitFor`, `waitForSelector`, `waitWhileSelector,` `waitForResource`, `waitUntilVisible`, `waitWhileVisible.`

Можно сделать вывод что плюшки у CasperJS есть, и им в целом можно пользоваться.

Материалы, которые помогали трудится над статьей:

[API документация с офсайта](https://casperjs.org/api.html)

[CasperJS, a toolkit on top of PhantomJS](https://nicolas.perriault.net/code/2012/introducing-casperjs-toolkit-phantomjs/) - прекрасная статья от Nicolas Perriault, которая по сути послужила фундаментом для моей.
