---
title: "Разворачиваем базу проекта на JavaScript"
tags: "db,deploy,javascript,migrate,node.js"
date: "2014-04-09"
---

Растут **JavaScript** проекты и соответственно становятся лучше инструменты сборки. Самое время задуматься о разворачивании базы своего проекта на **JavaScript**. А ведь и правда: если проект написан 100% на одной технологии (да, и сервер тоже), зачем думать о другой технологии для разворачивания базы?

Вот с такими мыслями я и начал исследовать данный вопрос с целью найти удобное решение для своего пэт-проектика (стек: **JavaScript**/**AngularJs** - **JavaScript**/**Express** - **MySql**). JavaScript сообщество (а точнее Андрей Листочкин), посоветовало обратить внимание на модуль для ноды **[db-migrate](https://www.npmjs.org/package/db-migrate "npmjs.org")** и плагин для гранта **[grunt-db-migrate](https://www.npmjs.org/package/grunt-db-migrate "npmjs.org")**. Пост является набором заметок по ходу внедрения модуля в проект.

На данный момент db-migrate поддерживает [Mysql](https://github.com/felixge/node-mysql "node-mysql"),  [PostgreSQL](https://github.com/brianc/node-postgres), [sqlite3](https://github.com/developmentseed/node-sqlite3). Поэтому, если вы хотите мигрировать другую базу - придется либо писать самому скрипт миграции либо использовать другое решение.

## Установка

Устанавливаем модуль ноды и плагин гранта:

$ npm install db-migrate
$ npm install grunt-db-migrate

## Настраиваем grunt

В **grunt** файле добавляем блок:

```javascript 
 migrate:{ options:{ env: { DATABASE_URL: databaseUrl } } } 
 ```

databaseUrl - строка подключения к базе, например:

```javascript 
  databaseUrl = 'mysql://root:@localhost/mypetdb';  
 ```

## Создаем файл миграции

Чтобы создать файл миграции(с шаблоном внутри) выполняем команду:

$ grunt migrate:create:migrate_name

После чего у нас в проекте появится директория "migrations", и файл в ней с таким содержимым:

[javascript]var dbm = require('db-migrate'); var type = dbm.dataType;

exports.up = function(db, callback) {

};

exports.down = function(db, callback) {

};[/javascript]

**exports.up** - инструкции для наката изменений, **export.down** - соответственно для отката сделанных изменений.

Разберем пример предложенный на офсайте:

[javascript] exports.up = function (db, callback) { db.createTable('pets', { id: { type: 'int', primaryKey: true }, name: 'string' }, callback); };

exports.down = function (db, callback) { db.dropTable('pets', callback); }; [/javascript]

Вроде бы все просто: **db.createTable()** - добавляем таблицу, **db.dropTable()** - удаляем.

Свойства, который можно определять для полей:

- type - тип данный, полный список поддерживаемых типов [тут](https://github.com/kunklejr/node-db-migrate/blob/master/lib/data_type.js "lib/data_type.js")
- length - размерность (там где поддерживается)
- primaryKey [true/false]
- autoIncrement [true/false]
- notNull [true/false]
- unique [true/false]
- defaultValue

Список поддерживаемых методов:

- createTable(tableName, columnSpec, callback)
- dropTable(tableName, [options,] callback)
- renameTable(tableName, newTableName, callback)
- addColumn(tableName, columnName, columnSpec, callback)
- removeColumn(tableName, columnName, callback)
- renameColumn(tableName, oldColumnName, newColumnName, callback)
- changeColumn(tableName, columnName, columnSpec, callback)
- addIndex(tableName, indexName, columns, [unique], callback)
- insert(tableName, columnNameArray, valueArray, callback)
- removeIndex([tableName], indexName, callback)
- runSql(sql, [params,] callback)
- all(sql, [params,] callback)

## Запуск

Теперь grunt может выполнить задачу:

$ grunt migrate:up

и чтобы откатить изменения:

$ grunt migrate:down

создать новый файл миграции:

$ grunt migrate:create:migration_name

## Дополнительно

Когда нам нужно создать несколько таблиц, удобно использовать модуль **async**:

[javascript] var async = require('async');

exports.up = function (db, callback) { async.series([ db.createTable.bind(db, 'pets', { id: { type: 'int', primaryKey: true }, name: 'string' }), db.createTable.bind(db, 'owners', { id: { type: 'int', primaryKey: true }, name: 'string' }); ], callback); }; [/javascript]

метод **async.series** позволит избежать вложенности

## Пример из реальной жизни

Вот файл миграции, который я создал для своего пет-проектика:

[javascript] var dbm = require('db-migrate'); var async = require('async');

exports.up = function (db, callback) { async.series([ db.createTable.bind(db, 'marks', { user_id: { type: 'int', notNull: true }, release_id: { type: 'int', notNull: true }, feed: { type:'string', notNull: true } }) ], function(){ db.addIndex('marks', 'usermark', ['user_id', 'release_id'], true); callback(); }); };

exports.down = function (db, callback) { async.series([ db.dropTable.bind(db, 'marks', { ifExists: true }), db.removeIndex('marks', 'usermark'), ], callback); }; [/javascript]

Проект портировался с локальной **mysql** базы на **postgress**, которая стояла на сервере. Особых косяков модуля db-migrate замечено не было. Можно отметить только мелкие неудобства, которых характерны для любых универсальных (кросс-субд) систем миграции - отсутствие реализации специфических типов: у меня изначально был тип **ENUM**, который пришлось перевести в **STRING**. Для личного проекта это нормальная замена, но для продакшена пришлось бы писать отдельный дополнительный конвертер.

Более подробно можно почитать на [офсайте](https://www.npmjs.org/package/db-migrate) либо покопать [код](https://github.com/kunklejr/node-db-migrate).
