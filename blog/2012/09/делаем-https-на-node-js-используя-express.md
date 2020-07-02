---
title: "Делаем HTTPS на Node.js используя express"
tags: "express,https,javascript,node.js,ssl"
date: "2012-09-27"
---

Такая вот быстрая заметка по организации **HTTPS**(**SSL**) соединения на ноде через фреймворк, чего не нашел в официальной документации **express**.

Модули которые необходимо подключить:

```javascript
var express = require('express');  // сам фреймворк
var https = require( "https" );  // для организации https
var fs = require( "fs" );   // для чтения ключевых файлов
```

Задать опции ключевой информации:

```javascript
httpsOptions = {
    key: fs.readFileSync("server.key"), // путь к ключу
    cert: fs.readFileSync("server.crt") // путь к сертификату
}
```

Открыть порт

```javascript
https.createServer(httpsOptions, app).listen(443);
/*app - это объект полученый от express().
```

