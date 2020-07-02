---
title: "Очень быстрый старт с Ember.js"
tags: "ember,javascript"
date: "2014-04-03"
---

Да, я не просто назвал пост **Очень** быстрый, потому что все найденные мной статьи "быстрый старт" оказывались каким-то болотом, которое уж точно не давало быстрого старта.

Создадим пустой файлик _index.html_ и пошагово создадим в нем  **Ember** приложение.

## Шаг1 - Подключение

Кроме самого фреймворка Ember.js нам необходимо также подключить его зависимости - Handlabrs и jQuery, поэтому добавляем в файл:

```html 
  <script type='text/javascript' src='jquery.js'></script> <script type='text/javascript' src="handlebars.js"></script> <script type='text/javascript' src="ember.js"></script>  
 ```

чтобы еще ускорить процесс можно взять сразу все с CDN, даже не скачивая:

```html 
  <script type='text/javascript' src='//code.jquery.com/jquery-1.9.1.js'></script> <script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0-rc.3/handlebars.js"></script> <script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/ember.js/1.0.0-rc.1/ember.js"></script>  
 ```

## Шаг2 - Добавляем шаблоны

Шаблоны **Ember.js** проекта обычно хранятся в отдельных **.hbs** файлах, но для упрощения мы используем другой вариант - шаблоны внутри скрипт-тегов.

Давайте добавим шаблон _application_ в наш _index.html_ файл:

```html 
  <script type="text/x-handlebars" data-template-name="application"> <div class="container"> <h1>Ember.js быстрое погружение без подготовки</h1> <p>{{message}}</p> </div> </script>  
 ```

## Шаг3 - Инициализируем приложение

Просто добавим еще один script-тег с содержимым:

```html 
  <script type='text/javascript'> App = Ember.Application.create({}); </script>  
 ```

Приложение создано,  оно уже выводит наш шаблон.

## Шаг 4 - Добавляем контроллер

Ember инициализирует какждый шаблон в контекте конкретного контроллера. Для шаблона _application_ это будет _ApplicationController_, который Ember создаст сам автоматически, если вы не определили его изначально. Но давайте попробуем создать свой и добавить значение для переменной шаблона _message_:

```javascript 
  App.ApplicationController = Ember.Controller.extend({ message: 'А эту строку выведет в шаблон' });  
 ```

Хочу обратить ваше внимание: в Ember все сущности создается как наследники-расширения(типа **extend**) с подобным синтаксисом.

## Шаг 5 - Определяем роуты

Роуты (routes) - очень мощный инструмент Ember.js фреймворка, который позволяет удобно сочетать шаблоны и контроллеры в приложении. Добавим 2 новых контроллера и роуты для них:

[javascript] App.Router.map(function() { this.route("index", { path: "/" }); this.route("list", { path: "/list" }); });

App.IndexController = Ember.Controller.extend({ message: 'Hello! See how index.hbs is evaluated in the context of IndexController' });

App.ListRoute = Ember.Route.extend({ setupController: function(controller) { controller.set('content', ['angular.js', 'backbone.js', 'ember.js']); } }); [/javascript]

Чтобы это заработало необходимо добавить в наш application-шаблон переменную **{{outlet}}**, в которую роутер будет подгружать соответствующий шаблон в зависимости от роута. Мы также используем **{{linkTo}}** хелпер для навигации:

[javascript] <script type="text/x-handlebars" data-template-name="application"> <div class="container"> <h1>Ember.js быстрое погружение без подготовки</h1> <p>{{message}}</p> <div class="row"> {{#linkTo index class="span3 btn btn-large btn-block"}}Home{{/linkTo}} {{#linkTo list class="span3 btn btn-large btn-block"}}List{{/linkTo}} </div> {{outlet}} </div> </script>

<script type="text/x-handlebars" data-template-name="list"> <h3 class="demo-panel-title">Это шаблон списка</h3> <ul> {{#each item in content}} <li>{{item}}</li> {{/each}} </ul> </script>

<script type="text/x-handlebars" data-template-name="index"> <h3 class="demo-panel-title">Шаблон главной страницы</h3> <p>{{message}}</p> </script> [/javascript]

Это все! Более подробно на [оф сайте](https://emberjs.com/guides/ "emberjs.com guies").

Полный код приложения в [песочнице](https://jsbin.com/vatup/1/).

Отдельная благодарность **Mike Grassotti** и его [развернутый ответ](https://stackoverflow.com/questions/14204674/how-to-architect-an-ember-js-application/14205734#14205734 "stackoverflow") на stackoverflow.
