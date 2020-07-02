---
title: "AngularJS: подружить $httpBackend моки с шаблонами"
tags: "$httpBackend,AngularJs,mock,templates"
date: "2014-01-29"
---

Если необходимо использовать одновременно mock-сервис **$httpBackend**(из **ngMock** или **ngMockE2E**) и загрузку шаблонов из файлов(которая идет через незамоканы **$httpBackend** сервис), получаем конфликт с выдачей следующей ошибки:

Error: Unexpected request: GET views/main.html

Которая говорит о том, что наш мок не знает ничего о шаблонах.

Возможны 2 варианта решения:

1. отказаться вообще от загрузки html файлов (гуглить в тему **кеширования шаблонов** и **html2js**) - это позволит не использовать **$httpBackend** сервис вообще
2. сделать заглушку на заглушку: дать инструкции мок сервису **пропускать запросы на шаблоны**. Делается это так: $httpBackend.whenGET(/^tepmlates\\//).passThrough();

Полный код второго варианта:

app.run(function ($httpBackend) {
        $httpBackend.whenGET(/^tepmlates\\//).passThrough();
});

 

[Полезная статья](https://endlessindirection.wordpress.com/2013/05/18/angularjs-delay-response-from-httpbackend/) в тему и [пример](https://plnkr.co/edit/pbjcDl?p=preview "plunker"), также обсуждение на [SO](https://stackoverflow.com/questions/14761045/jasmine-tests-angularjs-directives-with-templateurl "StackOverflow").
