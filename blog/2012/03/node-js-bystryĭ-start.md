---
title: "Node.js быстрый старт."
tags: "install,javascript,node.js,ubuntu"
date: "2012-03-31"
slug: "node-js-быстрый-старт"
---

Если вы хотите быстро понять специфику работы Node.js не тратя много времени на изучение толстых учебников, то это статья для вас - максимально просто и доступно( Но учитывает то, что вы понимаете что такое сервер и работали уже с javascript).

Сразу скажу что статья основана на учебнике https://nodebeginner.ru/, в котором все разжевано максимально подробно. У нас будут только основные моменты плюс некоторая специфика установки для Ubuntu.

Ставится node.js в Ubuntu командой:

sudo apt-get install **nodejs**

Далее мы можем приступить к написанию своего "Hello world" примера. Создадим директорию в которой будут находится все наши скрипты для node.js и в ней создадим файл _helloworld.js_. Содержание файла будет следующим:

console.log("Hello World");

Пример готов, мы можем запустить наш скрипт командой

node helloworld.js

В консоли нам должно вывести _Hello World_.

Итак, мы научились запускать скрипты с помощью node.js. Теперь давайте попробуем сделать сервер, который сможет обрабатывать запросы. Создадим новый файл, пускай это будет _server.js_ со следующим содержимым:

var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);

Запускаем скрипт сервера:

node server.js

У теперь в браузере можем набрать: https://127.0.0.1:8888.

Ну вот, для начала хватит.
