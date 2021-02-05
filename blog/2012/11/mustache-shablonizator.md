---
title: "Mustache шаблонизатор"
tags: "javascript,mustache"
date: "2012-11-16"
slug: "mustache-шаблонизатор"
---

![](images/mustache_js.png "mustache_js")

[Mustache](https://mustache.github.com) - простой шаблонизатор с минимумом логики, но набирающий все большую популярность и добавляющий в свои ряды новые языки, которые его поддерживают([Ruby](https://github.com/defunkt/mustache), [JavaScript](https://github.com/janl/mustache.js), [Python](https://github.com/defunkt/pystache), [Erlang](https://github.com/mojombo/mustache.erl), [PHP](https://github.com/bobthecow/mustache.php), [Perl](https://github.com/pvande/Template-Mustache), [Objective-C](https://github.com/groue/GRMustache), [Java](https://github.com/spullara/mustache.java), [.NET](https://github.com/jdiamond/Nustache), [Android](https://github.com/samskivert/jmustache), [C++](https://github.com/mrtazz/plustache), [Go](https://github.com/hoisie/mustache.go/), [Lua](https://github.com/nrk/hige), [ooc](https://github.com/joshthecoder/mustang), [ActionScript](https://github.com/hyakugei/mustache.as), [ColdFusion](https://github.com/pmcelhaney/Mustache.cfc), [Scala](https://github.com/scalate/scalate), [Clojure](https://github.com/fhd/clostache), [Fantom](https://github.com/vspy/mustache), [CoffeeScript](https://github.com/pvande/Milk), [D](https://github.com/repeatedly/mustache4d), node.js.)

Я приведу пример как можно использовать **Mustache** вместе с JavaScript.

Для старта нам необходимо выкачать [Mustache](https://github.com/janl/mustache.js/raw/master/mustache.js), и создать себе html-файл для экспериментов, в который подключить библиотеку.

Разберем пример с офсайта. Структура данных:

```javascript
var  data = {
        "header": "Colors",
        "items": [
            {"name": "red", "first": true, "url": "#Red"},
            {"name": "green", "link": true, "url": "#Green"},
            {"name": "blue", "link": true, "url": "#Blue"}
        ],
        "empty": false
    };
```

(добавим его в javascript тег к нашей html страничке)

и сам шаблон **Mustache**:

```html
<h1>{{header}}</h1>
{{#bug}}
{{/bug}}

{{#items}}
  {{#first}}
    <li><strong>{{name}}</strong></li>
  {{/first}}
  {{#link}}
    <li><a href="{{url}}">{{name}}</a></li>
  {{/link}}
{{/items}}

{{#empty}}
  <p>The list is empty.</p>
{{/empty}}
```

Для простоты первого примера поместим весь этот шаблон в строковую переменную _template_.

осталось применить метод **Mustache.to_html**():

```javascript
console.log(Mustache.to_html(template, data));
```

Вот [тут](https://jsfiddle.net/STEVER/nvxe3/1/) можно поиграть с исходным кодом.

Расширим этот вариант и сделаем его полным аналогом офсайта: т.е. чтобы можно было подавать данные и шаблон через textarea, [вот так](https://jsfiddle.net/STEVER/nvxe3/2/).

С песочницей разобрались, переходим рассмотрению самой библиотеки. Мы уже опробовали основной метод _Mustache.to_html_, который имеет следующий синтаксис:

```javascript
to_html(template, data, partials, send)
```

Но! Этот метод, как оказалось, уже является deprecated и вместо него стоит использовать render():

```javascript
render(template, data, partials)
```

template - шаблон (string)

data - данные подставляемые в шаблон (object)

partials - массив подшаблонов, также динамически собираемых

Остальные методы, которые не так реже используются это:

clearCache() - для очистки кеша

compile(template, tags) - компилирует шаблон в выполняемую функцию

compilePartial(name, template, tags) - тоже для подшаблонов

Как видим: методов у **mustache.js** совсем не много. Поэтому продолжим разбирать структуру шаблонов.

Возможны следующие встраивания в html:

### переменная(variable)

{{variable}} - экранированный вывод переменной

{{{variable}}} - не экранированный вывод переменной

{{variable.property}} - обращение к свойству объекта

### СекЦИЯ(SECtion)

Секция представляет из себя блок заключенные между тегами {{#sectionname}} и {{/sectionname}}

Поведение секции зависит от переданного в нее значения:

- true/false - ведет себя как оператор if: отображает блок только в случае, когда было передано true.
- список значений - аналог цикла с поставлением значений
- функция - получает 2 значения: текст блока и рендер метод, и заменяет блок своим результатом

### подшаблон(partial)

имеют синтаксис {{> partialname}} и подставляют не переменную, а целый шаблон.

### комментарий(comment)

{{! comment}} - вывод комментария

 

Более подробно можно почитать:

- [официальная документация](https://mustache.github.com/mustache.5.html)
- [документация mustache.js](https://github.com/janl/mustache.js)

Относительно субъективные сравнительные тесты с другими шаблонизаторами можно посмотреть [тут](https://akdubya.github.com/dustjs/benchmark/index.html).
