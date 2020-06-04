---
title: "Пишем свой Uploader с нуля на javascript используя FileApi. Часть1"
tags: "fileApi,javascript,uploader,Хочу сделать мир лучше"
date: "2012-04-29"
---

Отметим ключевые моменты, которые нас интересуют по FileApi: - у input с атрибутом type="file" теперь есть свойство files(массив объектов класса File) а объект класса File содержит следующие свойства: name — имя файла type — MIME тип файла size — размер в байтах

Для чтения файла мы теперь можем использовать класс FileReader, который имеет следующие методы: readAsBinaryString(file) — чтение в бинарном режиме. readAsText(file\[, encoding\]) — чтение в текстовом режиме. Дополнительным аргументом указывается кодировка (по-умолчанию UTF-8). readAsDataURL(/forum/file) — чтение в бинарном режиме с последующей перекодировкой в Data:URL.

Основные моменты теории разобрали, остальное - по ходу дела.

Создадим простую HTMLку:

<input type="file" name="file" id="file-field"/> <textarea id="buffer"></textarea>

Для наглядности мы не будем сразу отправлять файл, а разберем пошагово процесс и загрузим содержимое файла в тег textarea:

Для этого повесим обработчик изменения состояния на поле ввода файла:

document.getElementById('file-field').onchange = function(){ var reader = new FileReader; reader.onload = function(e){ document.getElementById('buffer').innerHTML = e.target.result; } reader.readAsDataURL(this.files\[0\]); }

Если мы все правильно сделали, то после выбора файла его содержимое будет загружено в textarea.

Вот тут можно поиграться с кодом: http://learn.javascript.ru/play/esPXY

Подробнее можно почитать в спецификации: http://www.w3.org/TR/FileAPI/
