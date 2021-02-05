---
title: "Пишем свой Uploader с нуля на javascript используя FileApi. Часть4"
tags: "ajax,fileApi,javascript,uploader"
date: "2012-07-30"
slug: "пишем-свой-uploader-с-нуля-на-javascript-используя-fileapi-ча-4"
---

В частях [1](https://stepansuvorov.com/blog/2012/04/%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-%D1%81%D0%B2%D0%BE%D0%B9-uploader-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D0%BD%D0%B0-javascript-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-fileapi-%D1%87%D0%B0/), [2](https://stepansuvorov.com/blog/2012/06/%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-%D1%81%D0%B2%D0%BE%D0%B9-uploader-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D0%BD%D0%B0-javascript-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-fileapi-%D1%87%D0%B0-2/), [3](https://stepansuvorov.com/blog/2012/07/%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-%D1%81%D0%B2%D0%BE%D0%B9-uploader-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D0%BD%D0%B0-javascript-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-fileapi-%D1%87%D0%B0-3/) мы научились читать файлы с диска.Теперь попробуем разобрать процесс отправки файлов на сервер с помощью технологии ajax.

В начале вспомним как работать с аяксом для передачи файла на сервер:

1. Метод передачи будет POST
2. Обязательно нужно будет указать Content-Type, а именно multipart/form-data
3. Правильно сформировать само тело сообщения

Получим следующий код(по пунктам):

var request = new XMLHttpRequest(); 
request.onreadystatechange = ajaxReady; 
request.open('POST', 'uploader.php', true); // (1)
request.setRequestHeader('Content-Type', contentType); // (2)
request.sendAsBinary(createTestMsg()); // (3)

ajaxReady - это просто callback-функция, которая вызовется при ajax-ответе. Для нее пока установим простую заглушку:

function ajaxReady() {
    if (request.readyState == 4 && request.status == 200) {
        alert(request.responseText);
    }
}

uploader.php  - тоже пока файл-заглушка на стороне сервера, следующего содержания:

<?php

var_dump($_POST);
var_dump($_FILES);

Теперь перейдем к более важным моментам. contentType определяем следующим образом:

var boundary = "AJAX-----------------------" + (new Date).getTime();
var contentType = "multipart/form-data; boundary=" + boundary;

boundary - это случайная последовательность байт, которые не должны встречаться в самом файле. Вы можете придумать свой алгоритм для генерации данной последовательности, т.к. это лишь пример.

Ну и самое основное - формирование сообщения:

function createTestMsg(){
    var fieldName = 'testfile';
    var fileName  = '4.jpg';
    var CRLF = "\\r\\n";

    var msg = "--" + boundary + CRLF;
    msg += 'Content-Disposition: form-data; ';
    msg += 'name="' + fieldName + '"; ';
    msg += 'filename="'+ fileName + '"' + CRLF;
    msg += 'Content-Type: application/octet-stream';
    msg += CRLF + CRLF; // marks end of the headers part
    msg += Array(9999).join(7) + CRLF;
    msg += "--" + boundary + "--" + CRLF;
    return msg;
}

Array(9999).join(7) - это такой вариант генерации фэйкового контента для файла.

Вот тут можно посмотреть весь код: https://learn.javascript.ru/play/E1MhM, но в песочнице он работать не будет, т.к. нет файла uploader.php на строне сервера, так что в любом случае нужно копировать локально и смотреть.
