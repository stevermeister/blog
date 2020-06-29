---
title: "Node.js установка модулей."
tags: "javascript,node.js,ubuntu"
date: "2012-04-02"
---

В дополнение к теме "Быстрый старт" напишу о том как ставить различные модули на node.js.

Модули удобно ставить через спеиальный пакетный менеджер node.js, а именно **npm**. Но сначала необходимо поставить сам менеджер.

Ставится он автоматически скриптом, который можно скачать по [ссылке](https://npmjs.org/install.sh "npm install ") .

Скрипт обязательно запросит свежую версию самой ноды, поэтому советую устанавливать следующими командами

```
sudo apt-get install python-software-properties 
sudo add-apt-repository ppa:chris-lea/node.js 
sudo apt-get update 
sudo apt-get install nodejs
```

Также для установки **npm** понадобится **curl**, который можно поставить так:

```
sudo apt-get install curl
```

Все мы готовы ставить модули. Поставим например express и sockets.io:

```
npm install express
npm install socket.io
npm install supervisor
```

Все просто. Полный список модулей можно посмотреть [тут](https://github.com/joyent/node/wiki/modules "node.js modules").
