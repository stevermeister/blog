---
title: "Сборка javascript проектов с помощью Grunt"
tags: "grunt,javascript,node.js"
date: "2012-10-30"
slug: "сборка-javascript-проектов-с-помощью-grunt"
---

![](images/grunt_logo-300x300.png "grunt_logo")

[Grunt](https://gruntjs.com/) - инструмент для сборки JavaScript проектов из командной строки. Молодой (зарелизился в январе 2012) и активно развивающийся(на данный момент для него написано уже 188 плагинов).

Благодаря тому, что **grunt** имеет готовый npm-пакет для node.js,  установка очень простая:

$ npm install grunt -g

Ставим **grunt** глобально, после чего нам доступна команда из консоли:

$ grunt --version
grunt v0.3.17

Далее необходимо **инициализировать проект**, для этого у нас есть команда grunt init:TEMPLATE, где TEMPLATE - один из шаблонов:

- commonjs
- jquery
- node
- gruntfile - только главный файл
- gruntplugin

Перейдем в директорию где мы хотим создать grunt проект и выполним:

$ grunt init:jquery

после чего должно выдать серию вопросов о проекте(title, description, git-url...). После успешного прохождения этого квеста в выбранной директории появятся файлы сборщика.

Установим также [PhantomJs](https://stepansuvorov.com/blog/2012/09/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%B5%D0%BC-%D1%8E%D0%BD%D0%B8%D1%82-%D1%82%D0%B5%D1%81%D1%82%D1%8B-%D1%81-phantomjs/ "статья по phantomjs"), наличие которого предполагает grunt.

После чего можем смело запускать сборщик на выполнение:

$ grunt
Running "lint:files" (lint) task
Lint free.

Running "qunit:files" (qunit) task
Testing testproject.html....OK
>> 4 assertions passed (23ms)

Running "concat:dist" (concat) task
File "dist/testproject.js" created.

Running "min:dist" (min) task
File "dist/testproject.min.js" created.
Uncompressed size: 467 bytes.
Compressed size: 229 bytes gzipped (324 bytes minified).

Done, without errors.

_ вот так вот он работает: проверил код(JSHint), запустил тесты(QUnit), соединил и сжал  файлы.

Чтобы рассмотреть инструкции по конфигурированию сборщика, проинициализируем новый проект:

$ grunt init:gruntfile

Он создаст только заготовку для главного файла(grunt.js). Откроем ее и посмотрим что внутри.

Начнем разбор с конца файла:

grunt.registerTask('default', 'lint qunit concat min');

Эта строчка говорит grunt какие задачи будут выполнены по умолчанию(т.е. запустив команду без параметров). Тут мы можем добавить свои варианты:

grunt.registerTask('prod', 'lint qunit concat min');
grunt.registerTask('test', 'lint qunit');

Возможные варианты заданий:

- concat - конкатенация файлов
- init - Generate project scaffolding from a predefined template.
- lint - валидация файлов с помощью  [JSHint](https://www.jshint.com/).
- min - сжатие файлов с [UglifyJS](https://github.com/mishoo/UglifyJS/).
- qunit - Запуск [QUnit](https://docs.jquery.com/QUnit) юнит тестов на [PhantomJS](https://www.phantomjs.org/).
- server - запускает статический веб сервер.
- test - запуск юнит тестов на [nodeunit](https://github.com/caolan/nodeunit).
- watch - запуск заранее определенных заданий, для файлов из списка.

Ну а теперь последовательно по секциям конфига(по сути конфигурация для каждого задания):

meta - описание проекта, вспомогательная информация
lint/qunit/test/concat/min - список фалов, 
которые нужно отвалидировать(JSHint)/протестировать(qUnit)/протестировать(nodeUnit)/объединить/сжать(UglifyJS)
watch - список файлов и команды, которые необходимо выполнить, в случае изменения содержания файла
jshint - конфигурация JSHint
uglify - специфические настройки UglifyJS
server - пока не понятно зачем

Для каждой опции, где мы указываем список файлов существуют 2 подсекции: files и src. По умолчанию задание выполняется с командой files, но если мы хоти выполнить со списком файлов src, тогда стоит уточнить:

grunt.registerTask(`'build_src'``,` `'lint:src qunit:src concat:src min:src'``);`

Если встроенных заданий не хватает, можно писать свои и мотом подключать их с помощью методов:

grunt.loadTasks(ПУТЬ_К_ДИРЕКТОРИИ_С_ЗАДАНИЕМ);
`grunt.loadNpmTasks(ИМЯ_ПЛАГИНА);`

_ второй вариант для дополнительных задач установленных через **npm**. Вот хорошая [страничка](https://github.com/gruntjs/grunt-contrib), на которой перечислены самые распространенные варианты. Попробуем поставить **requirejs**:

npm install grunt-contrib-requirejs

и подключим в файл конфигурации:

grunt.loadNpmTasks("requirejs");

Внимание! тут есть специфика: модули установленные через npm будут подхватываться только если установлены в директорию c grunt. Подробно проблема описана вот [тут](https://github.com/gruntjs/grunt/issues/232).

Из основного это все.
