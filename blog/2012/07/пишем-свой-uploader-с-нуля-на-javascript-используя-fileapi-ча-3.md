---
title: "Пишем свой Uploader с нуля на javascript используя FileApi. Часть3"
tags: "javascript,uploader"
date: "2012-07-26"
---

В этой части мы рассмотрим ключевой момент: чтение файла частями - это очень важно при отправке больших файлов( от 400-700МБ ), т.к. если мы будем пытаться их читать целиком - это вызовет дикие тормоза браузера.

Введем новое определение **Blob**. Если раньше мы говорили о **File**, как об объекте всего файла, то Blob - это объект-интерфейс работы с куском файла. Для получения этого объекта необходимо выполнить метод **slice** для File (в зависимости от браузера это **webkitSlice** или **mozSlice**). Думаю мы можем сделать универсальный метод следующим образом:

function fixSlice(file, startingByte, endindByte){
    var blob;
    if (file.webkitSlice) {
        blob = file.webkitSlice(startingByte, endindByte);
    } else if (file.mozSlice) {
        blob = file.mozSlice(startingByte, endindByte);
    }
    return blob;
}

А вот так будет выглядеть код для чтения блоба(мы прочитаем с 0 по 15 байт файла):

document.getElementById('file-field').onchange = function(){
    var file = this.files[0];
    var start = 0;
    var stop = 15;
    var reader = new FileReader;
    reader.onloadend = function(e){
        if (e.target.readyState == FileReader.DONE) {
            document.getElementById('buffer').innerHTML =
             'bytes: ' + start + ' - ' + stop + ' total:' + file.size;
        }
    }
    var blob = fixSlice(file, start, stop);
    reader.readAsBinaryString(blob);
}

Внимание! Тут есть некоторая специфика, по сравнению с чтением объекта File: вместо метода **onload** используется метод **onloadend.** И добавилась дополнительная проверка **e.target.readyState**.

Теперь усложним пример: добавим еще кнопочку чтения  и будем читать файл частями по нажатию этой кнопки:

var file;
var pointer = 0;
var blob_size = 16;
var reader;

document.getElementById('file-field').onchange = function(){
  file = this.files[0];
  reader = new FileReader;
  reader.onloadend = function(e){
    if (e.target.readyState == FileReader.DONE) {
      pointer += blob_size;
      document.getElementById('buffer').innerHTML =
         'bytes: ' + pointer + '/from' + file.size;
    }
  }
}

function doRead(){
  if(window.file){
    var blob = fixSlice(file, pointer, pointer+blob_size);
    reader.readAsBinaryString(blob);
  }else{
    alert('Please select the file');
  }
}

var readbutton = document.getElementById('read-button');
readbutton.addEventListener( "click" , doRead, false);

Как-то так.

pointer - запоминаем текущее положение указателя чтения

Вот тут можно поиграться с текущим кодом: https://learn.javascript.ru/play/yn9Zgb

И еще один вариант с выводом контента файла:  https://learn.javascript.ru/play/qi8olc

Теперь автоматизируем процесс загрузки(не давя на кнопочку): https://learn.javascript.ru/play/K2XUsc

Вот мы и научились загружать файлы по частям используя blob.
