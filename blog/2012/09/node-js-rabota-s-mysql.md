---
title: "Node.js работа с MySQL"
tags: "javascript,mysql,node.js"
date: "2012-09-07"
slug: "node-js-работа-с-mysql"
---

![](images/mysql_node.png "mysql_node")

Если уже мы решились заняться серверным программированием, то без базы не обойтись. Поэтому разберем как должна работать связка **node.js** и **mySQL**.

Для начала поставим модуль работы с базой:

npm install mysql

Получаем объект модуля:

```javascript
var mysql = require("mysql");
```

Создаем соединение:

```javascript
var client = mysql.createClient();
client.host = "127.0.0.1";
client.port = "3306";
client.user = "someuser";
client.password = "userpass";
client.database = "node";
```

Теперь можем посылать запросы к базе используя метод  `client.query()`, который имеет следующий синтаксис:

```javascript
client.query(query, [params, callback]);
```

например выполним запрос на выборку данных:

```javascript
client.query("SELECT * FROM users", function (error, result, fields) {
  console.log(result);
});
```

чтобы завершить соединение делаем:

```javascript
client.end();
```

Более сложные примеры потом.

UPD: по просьбам трудящихся обновляю пост.

Подключаемся:

```javascript
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
});
```

Добавление записи:

```javascript
var query = connection.query("INSERT INTO users SET ?", user, function (
  err,
  result
) {
  console.log(err);
  console.log(result);
});
```

Где _user_ - это объект с данными.

Обновление:

```javascript
var query = connection.query("UPDATE users SET ? WHERE id = 9", user, function (
  err,
  result
) {
  console.log(err);
  console.log(result);
});
```

Можно также переопределить метод query:

```javascript
connection.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(
    /\\:(\\w+)/g,
    function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this)
  );
};
```

и тогда можно будет использовать следующий синтаксис:

```javascript
connection.query("UPDATE posts SET title = :title", { title: "Hello MySQL" });
```

Вот [тут](https://github.com/felixge/node-mysql) довольно качественный мануал появился, которого еще не было на момент создания этого поста.
