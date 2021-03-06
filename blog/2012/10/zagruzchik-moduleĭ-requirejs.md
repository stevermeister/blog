---
title: "Загрузчик модулей RequireJS"
tags: "AMD,javascript,RequireJS"
date: "2012-10-19"
slug: "загрузчик-модулей-requirejs"
---

![](images/require-js_logo.png "require-js_logo")

**RequireJS** - если не самый популярный, то один из самых популярных файловых/модульных загрузчиков. При создании крупных компонентных проектов без него (или его аналогов) не обойтись, т.к. он решает основные проблемы таких приложений:

- зависимости между модулями
- засорение глобальной области

**RequireJS** использует [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD "Asynchronous Module Definition") концепцию. Создан для использования в браузере, но возможно использование и с node.js. Поддерживается всеми современными и не только веб браузерами: RequireJS works in IE 6+, Firefox 2+, Safari 3.2+, Chrome 3+, and Opera 10+. Имеет сравнительно небольшой размер(5.5k в сжатом виде). Поддерживает несколько плагинов: [text](https://requirejs.org/docs/download.html#text), [domReady](https://requirejs.org/docs/download.html#domReady), [cs (CoffeeScript)](https://requirejs.org/docs/download.html#cs), [i18n](https://requirejs.org/docs/download.html#i18n) .

Разберем более подробно, как можно использовать [**RequireJS**](https://requirejs.org) для нашего проекта. Вот [тут](https://requirejs.org/docs/download.html "requireJS download") берем свеженькую версию(Для ознакомления желательно использовать несжатый вариант "_With Comments_").

Теперь создаем заготовку HTML страницы, где будем экспериментировать с нашим загрузчиком:

```html
<!DOCTYPE html>
<html>
  <head>
    <script data-main="scripts/main" src="scripts/require.js"></script>
  </head>
  <body></body>
</html>
```

Тут хочу обратить ваше внимание на особенность использования дата-атрибута, из которого **RequireJS** получает информацию о главном файле с инструкциями по загрузке(в нашем случае это будет /scripts/main.js)

Создаем _main.js_ со следующим содержанием:

```javascript
require(["util"], function (util) {
  alert("это выполнится только тогда, когда файл util.js будет загружен");
});
```

Создадим пустой util.js файл и проверим работу. На данный момент у вас должна получится такая структура директорий:

- index.html
- scripts/
  - main.js
  - require.js
  - util.js

По сути работа с RequireJS заключается в использовании 2х методов **define** и **require**.

Метод **define** служит для описания модулей и имеет следующий синтаксис:

define( [moduleName,] dependencies, callback)
moduleName - имя модуля (необязательный параметр)
dependencies - массив зависимостей(с другими модулями)
callback - тело модуля, в которое передаются dependencies

Для нашего случая будет выглядеть так(модуль содержит только одну зависимость):

```javascript
define("unit", ["jQuery"], function (jQuery) {
  return { foo: "bar" };
});
```

Но если бы модуль содержал больше зависимостей, мы бы могли добавить их:

```javascript
["jQuery", "jQueryUI", "AnotherModule"];
```

и соответственно в функцию бы добавилось больше параметров:

```javascript
function( jQuery, jQueryUI, AnotherModule ){
```

Метод **require** фактически должен вызываться только один раз в главном файле(но в проекте может быть не один главный/корневой файл) имеет схожий синтаксис с define, но не имеет параметра названия модуля:

```javascript
require(requiredModules, callback);
```

Мы уже поместили вызов метода в main.js:

```javascript
require(["util"], function (util) {
  //важно то, что util будет доступно только тут
  //и его не будет в глобальной области видимости
});
```

Настроить опции RequireJS можно через метод **require.config**(), например:

```javascript
require.config({
  baseUrl: "/another/path",
  paths: { some: "some/v1.0" },
  waitSeconds: 15,
});
```

Возможные параметры:

- baseUrl - базовый путь, где лежат все модули
- paths - пути для модулей, которые находятся не в baseUrl
- waitSeconds - таймаут, который загрузчик будет ждать скрипта
- shim - для поддержки модулей сторонних модулей описанных не через define
- map - позволяет ссылаться через алиас на разные файлы для разных сборок
- config - для дополнительных настроек, которые будут доступны в модулях
- packages - указание директорий/пакетов, для множественной загрузки модулей
- context - указание контекста(например: `` version1, `version2` ``)
- deps - массив зависимостей
- callback - вызовется, когда будут загружены зависимости указынные в параметре deps
- enforceDefine - true/false. вызовет ошибку, припопытке загрузки скрипта без define
- xhtml - true/false. использование [createElementNS](https://developer.mozilla.org/en-US/docs/DOM/document.createElementNS) для создания скрипт тегов
- urlArgs - дополнительные параметры при запросе скрипта(удобно использовать решая вопрос кеширования)
- scriptType - тип скрипта, по умолчанию "text/javascript" (можно также "text/javascript;version=1.8")

Более подробно рассмотрим некоторые из них.

Параметр **shim** позволяет добавить сторонние модули(которые определены не в AMD стиле, или проще говоря: без метода define) к общей схеме.

```javascript
requirejs.config({
  paths: {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery",
  },
  shim: {
    jquery: {
      exports: "jQuery",
    },
  },
});

require(["util", "jquery"], function (util, $) {
  console.log($(document));
});
```

Внимание! Я специально в примере подключил старую(1.4.4) версию **jQuery**, т.к. новая(>1.7.1) уже умная - совместима с AMD: если обнаруживает метод define, то автоматически прописывает себя. Т.е. мы можем использовать модуль "**jquery**" без объявления его через **shim**.

С помощью параметра **map** мы можем сделать более гибкими связи между модулями, например новый модуль зависит от более новой версии библиотеки, а старый модуль, но который все равно нужно поддерживать, - использует древнюю версию. Так вот для обоих модулей мы можем прописать одну зависимость на библиотеку, а через **map** реализовать версионность:

```javascript
requirejs.config({
  map: {
    "some/newmodule": { foo: "foo1.2" },
    "some/oldmodule": { foo: "foo1.0" },
  },
});
```

Структура файлов при этом:

- foo1.0.js
- foo1.2.js
- some/
  - newmodule.js
  - oldmodule.js

Т.е., в случае чего мы не будем менять по файлам все зависимости, а просто отредактируем **map** параметр в конфиге.

Из основного это все. Есть еще **RequireJS optimizer**, но это тема для отдельной статьи. Буду рад уточнениями и дополнениям в комментариях.
