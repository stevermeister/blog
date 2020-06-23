---
title: "node.js вместе c модулем socket.io"
tags: "javascript,node.js,socket.io,ubuntu,Хочу сделать мир лучше"
date: "2012-04-04"
---

Продолжим совместный разбор-изучение ноды. В этот раз разберем использования модуля socket.io, который реализует принцип сокетного взаимодействия между клиетом и сервером. При установленной ноде и менеджере пакетов, поставить модуль socket.io не составит труда - пишем простую команду:

npm install socket.io

Скачаем саму библиотеку в рабочую директорию с github, [отсюда](https://github.com/LearnBoost/socket.io/tree/master/lib "github socket.io lib path"). Поместим ее в каталог socket.io.

На [оф сайте](http://socket.io/#how-to-use "socket.io examples") есть примеры использования, один из них и разберем:

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(\_\_dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

Последовательно посмотрим что происходит:

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

Подкючаем необходимые модули в том числе и socket.io. Ставим на прослушку 80ты порт, если он занят - можно любой другой свободный - я у себя поставил на 83.

function handler (req, res) {

Функция handler присутствует тут "для мебели" и особого отношения к сокетам не имеет, но она поможет нам запустить пример и отдать пользователю html страничку.

io.sockets.on('connection', function (socket) {

Открываем соединение. Вторым параметром идет callback функция, которая параметром принимаем ссылку socket на конкретное подключение.

 socket.emit('news', { hello: 'world' });

Передаем на клиент данные(а именно объект { hello: 'world' } ) в потоке 'news'.

 socket.on('my other event', function (data) {
    console.log(data);
  });

Принимаем с клиента данные в потоке 'my other event' и выводим в консоль.

С серверной частью разобрались, теперь посмотрим на код на стороне клиента, который мы поместим в файле index.html:

<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>

Тут все еще проще:

<script src="/socket.io/socket.io.js"></script>

Подключаем библиотеку, именно таким способом: запрашиваем ее со стороны сервера, где она динамически генерируется. Не стоит пытаться ее скачать уже скомпилированную.

  var socket = io.connect('http://localhost');

Открываем соединение, вместо 'localhost' тут понятно дело может быть имя вашего хоста или просто IP адрес. Также если вы меняли номер порта стоит его указать, например localhost:83.

  socket.on('news', function (data) {
     console.log(data);

Читаем данные из потока 'news' (они нам передаются параметром data в callback функции) и выводим их в консоль.

socket.emit('my other event', { my: 'data' });

Передаем серверу данные в поток 'my other event'.

Ну вот и все: запускаем наш http://localhost и смотрим в консоль.

\* Вывод в консоль идет с помощью метода consol.log: в обычную консоль на стороне сервера и в консоль браузера(например FireBug для FireFox) - для клиента.
