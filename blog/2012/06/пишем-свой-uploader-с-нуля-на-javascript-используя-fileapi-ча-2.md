---
title: "Пишем свой Uploader с нуля на javascript используя FileApi. Часть2"
tags: "fileApi,javascript,uploader"
date: "2012-06-30"
---

Вот и созрело продолжение [первой части](https://stepansuvorov.com/blog/2012/04/%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-%D1%81%D0%B2%D0%BE%D0%B9-uploader-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D0%BD%D0%B0-javascript-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-fileapi-%D1%87%D0%B0/), где мы разобрались как можно использовать родной объект FileReader для чтения файла.

Давайте еще добавим прогресс чтения файла для нашего загрузчика. Для этого зададим callback метод для FileReader:

reader.onprogress = updateProgress;

Рассмотрим что из себя представляет метод **updateProgress**:

function updateProgress(event) {
    if (event.lengthComputable) {
        var progress = Math.round((event.loaded / event.total) \* 100);
        document.getElementById('buffer').innerHTML = progress + '%';
    }
}

Все просто. **event.lengthComputable** нам необходимо чтобы убедится что event - объект того события, которое мы ждем, а именно **ProgressEvent**.

Math.round((event.loaded / event.total) \* 100)

Примитивная математика для вычисления процента.

document.getElementById('buffer').innerHTML = progress + '%';

Тут мы использовали уже имеющийся textarea элемент с id = buffer, чтобы вывести проценты туда.

Вот что в итоге получилось:  https://learn.javascript.ru/play/u0bbrb _Советую использовать большие файлы( от 100МБ) для проверки работоспособности._

!Внимание: мы рассмотрели пока прогресс загрузки файла локально, т.е. непосредственно чтения содержимого файла скриптом, но еще не саму загрузку данных на сервер.
