---
title: "RequireJS Optimizer"
tags: "javascript,RequireJS,Хочу сделать мир лучше"
date: "2012-11-02"
---

На блоге уже был обзор [RequireJs](https://stepansuvorov.com/blog/2012/10/%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D1%87%D0%B8%D0%BA-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D0%B5%D0%B9-requirejs/), как загрузчика модулей, теперь разберем еще одну его возможность - компоновку/сборку проекта - **RequireJS Optimizer**.

Что умеет делать делать **RequireJS Optimizer**?

- оптимизировать JavaScript файлы: компоновать и минифицировать( по умолчанию [UglifyJS](https://github.com/mishoo/UglifyJS) )
- оптимизировать CSS файлы

Возможны варианты запуска: Node.js(желательно), Rhino.

Установка на ноду:

$ npm install requirejs

Проверим работоспособность:

$ r.js -v
r.js: 2.1.1, RequireJS: 2.1.1

Теперь проделаем все по примеру с офсайта. Создаем следующую структуру проекта:

- appdirectory
    - main.html
    - css
        - common.css
        - main.css
    - scripts
        - require.js
        - main.js
        - one.js
        - two.js
        - three.js
- [r.js](https://requirejs.org/docs/download.html#rjs)

Для тех, кому лень создавать эти все файлы, [вот](https://learn.javascript.ru/files/play/50/92/50923fcb2eb34.gz) готовая структура.

Переходим в директорию _appdirectory/scripts_ и выполняем команду:

$ node ../../r.js -o name=main out=main-built.js baseUrl=.

либо если **r.js** установлен глобальной командой, то можно так:

$ r.js -o name=main out=main-built.js baseUrl=.

"-o" - основная команда, которой запускается оптимизатор
"name=" - параметр для главного исходного файла(без расширения .js)
"out=" - исходящий файл

И в итоге оптимизатор должен выдать собранный и оптимизированный код проекта в файл _main-built.js_.

Если мы хотим require.js тоже строить в наш билд-файл, тогда добавим 2 опции:

$ r.js -o baseUrl=. paths.requireLib=require name=main include=requireLib out=main-built.js

\- в которых сделаем подключение модуля(_include_) и скажем где его брать(_path_).

Если мы хотим исключить какой-то файл из сборки(например: чтобы отдельно его подключить для отладки), то мы должны использовать опцию _excludeShallow_:

$ r.js -o name=main excludeShallow=two out=main-built.js baseUrl=.

и указать ей файл, который мы хотим исключить. В данном случае это _two.js_.

Также можно сказать r.js чтобы собрал файлы, но не оптимизировал их, для этого выставляем опцию _optimize=none_:

$ r.js -o name=main optimize=none  out=main-built.js baseUrl=.

Для скриптов, которые хотим грузить используя [CDN](https://ru.wikipedia.org/wiki/Content_Delivery_Network) либо с других сторонних доменов, необходимо задать в _path_ ключевое слово "_empty:_"(чтобы r.js не пытался их подгрузить):

```
$ r.js -o name=main out=main-built.js baseUrl=. paths.jquery=empty:
```

но, понятное дело, в коде останется полный путь:

requirejs.config({
  paths: {
    'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min'
  }
});

Для сжатия **CSS файлов** используем следующую команду:

```
$ r.js -o cssIn=main.css out=main-built.css
```

 

Ну и чтобы совсем уже все было здорово можно записать все команды в один файл конфигурации, а потом просто вызвать его:

$ r.js -o build.js

Вот так вот выглядит минимальный файл конфигурации:

({
    baseUrl: "appdirectory/scripts/",
    name: "main",
    out: "main-built.js",
})

Внимание! Именно так: обрамленный круглыми скобками JSON формат, а в конце нет точки с запятой.

Если мы хотим оптимизировать весь проект: файл за файлом, то делаем так:

({
    appDir: "appdirectory/",
    baseUrl: "scripts",
    dir: "./build",
    modules: [
        {
            name: "main"
        }
    ]
})

В итоге мы получим структуру аналогичную нашему проекту, только с оптимизированными файлами. Тут также нужно не забыть создать отдельную директорию (в нашем случае это _./build_ ), чтобы не перетереть текущий проект. (Так что по запросу "А-а-а! RequireJs стер мой проект!" сюда)

appDir - директория приложения
baseUrl - путь к скриптам от appDir
dir - директория где будут созданы оптимизированные варианты

 

Есть еще один вариант запуска оптимизатора - через модуль requirejs в node.js. Это нам позволит сделать следующий код:

var requirejs = require("requirejs");

var config = {
    appDir: "appdirectory/",
    baseUrl: "scripts",
    dir: "./build",
    modules: [
        {
            name: "main"
        }
    ]
};
requirejs.optimize( config, function(results) {
    console.log(results);
});

и теперь выполним его напрямую на ноде(без r.js):

node build.js

 

И на закуску две интересные опции конфига - **onBuildRead** и **onBuildWrite** -  callback-метода, которые будут вызваны, когда оптимизатор прочитает/запишет файл, пример:

...
onBuildRead: function (moduleName, path, contents) {
        return contents.replace(/foo/g, 'bar');
    },

onBuildWrite: function (moduleName, path, contents) {
        return contents.replace(/bar/g, 'foo');
    },
...

 

Вот [тут](https://github.com/jrburke/r.js/blob/master/build/example.build.js) можно найти полный и подробно комментированный(на английском) пример конфигурационного файла для **RequireJs Optimizer**.

 

**UPD**: различие между опциями **exclude** и **excludeShallow**:

exclude - исключает всю ветку зависимостей за исключаемым файлом(т.е. если файл 1 внутри себя еще содержал зависимость от файлов 2 и 3, то все файлы будут исключены)

excludeShallow - исключает только сам файл, оставляя при этом все файлы зависимостей
