---
title: "Node.js и MongoDB"
tags: "MongoDB,node.js"
date: "2012-10-16"
---

![](images/logo-mongodb.png "logo-mongodb")

Попробуем подружить MongoDB и Node.js.

Договоримся что нода у нас уже стоит, если нет идем по тегу [Node.js](https://stepansuvorov.com/blog/tag/node-js/), и разбираемся, а потом возвращаемся сюда доставлять mongoDB.

Чтобы поставить MongoDB на Ubuntu(12.04) выполняем следующую команду:

$ apt-get install mongodb

Чтобы проверить правильно ли поставилось запускаем:

$ /usr/bin/mongo

Должно зайти в программу и выдать что-то типа:

MongoDB shell version: 2.0.4
connecting to: test

Далее устанавливаем дополнительный пакет на ноду:

$ npm install mongodb

если мы будем использовать во всех проектах монго, то имеет смысл поставить флажок __g_ "для всех":

$ npm install mongodb -g

!Внимание. Предварительно может потребовать установить пакет _node-gyp_.

$ npm install node-gyp -g

Есть. Проверим через простой скрипт _test.js_ установился ли модуль, содержание:

var mongo = require('mongodb');

Выполняем:

$ node test.js

Если ошибок не выдало, можно еще немного расширить наш скрипт:

var mongo = require('mongodb');
var host = 'localhost';
var port = mongo.Connection.DEFAULT_PORT;

var db = new mongo.Db('test', new mongo.Server(host, port, {}), {safe:false});
db.open(function(err, db) {
    console.log("Connected!");
    db.close();
});

_ создали объект базы, подключились к базе, закрыли соединение.

Немного расширим наш скрипт, добавим запись и чтение информации из базы:

...
var db = new mongo.Db('test', new mongo.Server(host, port,{}), {safe:false});
db.open(function(err, db) {
    console.log("Connected!");

    var collection = db.collection("simple_collection");
    collection.insert({hello:'world'});

    collection.findOne({hello:'world'}, function(err, item) {
        console.log(item);
        db.close();
    })

});

Чтобы добавить несколько записей можно сделать так:

collection.insert([{hello:'world'}, {hello:'world2'}, {hello:'world3'}]);

Думаю будет еще один пост непосредственно о использовании MongoDB, а в этом пока все.
