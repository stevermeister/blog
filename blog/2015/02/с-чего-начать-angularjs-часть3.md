---
title: "С чего начать изучение AngularJS. Часть3 - Ох уж эти сервисы."
tags: "AngularJs,javascript,сервисы"
date: "2015-02-23"
---

По просьбам трудящихся продолжаю серию постов на тему "**С чего начать изучение AngularJS**" ([часть1](https://stepansuvorov.com/blog/2012/12/%D1%81-%D1%87%D0%B5%D0%B3%D0%BE-%D0%BD%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%B8%D0%B7%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-angularjs/ "С чего начать изучение AngularJS"), [часть2](https://stepansuvorov.com/blog/2013/06/start-with-angularjs-part2/ "С чего начать изучение AngularJS. Часть2 – Шаблоны оживают.")). В этой части я постараюсь вкратце осветить применение сервисов в **AngularJS**.

**UPD**: Статья обновлена **1.11.2016**

Итак, что такое **сервисы**? Это по большому случаю то, что не попадает под определение представления.

Основное предназначение сервисов:

- **логика** (бизнес логика) приложения
- **коммуникация** между виджетами
- **уровень данных** и запросы к серверу
- **хранение состояния**

## Логика приложения

Приведу простейший пример: допустим нам нужно сделать приложение-калькулятор. Для этого в сервис поместим все операции по вычислению:

```javascript 
  app.service('Calculator', function(){ this.add = function(a, b){ return a + b; }; this.subtract = function(a, b){ return a - b; }; this.multiply = function(a, b){ return a \* b; }; this.divide = function(a, b){ return a / b; }; });  
 ```

теперь мы можем подключить нашу зависимость - сервис Calculator - в контроллер компонента и использовать его методы:

```javascript 
  controller: function(Calculator) { this.result = Calculator.add(this.a, this.b); });  
 ```

Полный пример можно посмотреть [тут](https://plnkr.co/edit/JgKOiBGaJkdvxujHoklG?p=preview "jsfiddle").

## Коммуникация между виджетами

Передача данных между сущностями Ангуляра довольно подробно рассмотрена в [этом](https://stepansuvorov.com/blog/2014/09/angularjs-data-transfer/ "Передача данных между сущностями AngularJS") посте. Ничего тут особого нет: в одном месте инжектим сервис, задаем значение, инжектим вдругом месте, читаем/меняем значение.

## Уровень данных и запросы к серверу

Уровень данных( или наши модели данных), который включает ajax-запросы к серверу. Давайте напишем простую модельку User с двумя методами:

[javascript] app.service('User', function(){ var endpoint = 'https://jsonplaceholder.typicode.com/users';

this.get = function(id){ return $.get(endpoint + '/' + id); }

this.getAll = function(){ return $.get(endpoint); } }); [/javascript]

теперь мы можем получить пользователей сервера и передать их в контроллер компонента по средством нашего сервиса:

[javascript] controller: function ($scope, User) { User.get(9).then(user => { this.title = { selectedUser : user } $scope.$apply(); });

User.getAll().then(users => { this.users = users; $scope.$apply(); }); }); [/javascript]

С полным примером можно поиграться [тут](https://plnkr.co/edit/6o9inqc2X5WsWrnwwmxP?p=preview "jsfiddle.net").

**!Внимание**: для получения даных с сервера был использован метод **jQuery** - **$.get()**. Это было сделано лишь с той целью, чтобы упростить пример и сфокусироваться больше на рассмотрении модели даных, а не способа их получения. В реальных проектах для получения данных лучше использовать сервис **[$http](https://docs.angularjs.org/api/ng/service/$http)**, а еще лучше его обертку типа **[Restangular](https://github.com/mgonto/restangular)** или **[$resource](https://docs.angularjs.org/api/ngResource/service/$resource)**.

## Хранение состояния

Идея в том, что контроллеры могут быть перезагружены в процессе работы приложения, поэтому мы не можем гарантировать, что данные приложения сохраненные в контроллере сохранятся.

Простейший пример этому будет сервис авторизации и хранение значение авторизирован ли пользователь или нет:

```javascript 
  app.service('Auth', function(){ this.isAuthorized = false; this.login = function(){ this.isAuthorized = true; } this.logout = function(){ this.isAuthorized = false; } });  
 ```

Полный пример [тут](https://plnkr.co/edit/ZBL9dEHVvxdCudrQG4wC?p=preview "jsfiddle.net").

 

## Типы сервисов

AnguarJS уже содежит в себе большой набор сервисов, поэтому первой классификацией будет:

- [нативные/встроенные сервисы AngularJS](https://stepansuvorov.com/blog/2013/07/%D0%B2%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B-angularjs/ "Встроенные сервисы AngularJS")
- кастомные (написанные нами)

Если посмотреть с другой стороны, то мы можем охарактеризовать все сервисы по типу вызова провайдера:

- [constant](https://docs.angularjs.org/api/auto/service/$provide#constant "docs.angularjs.org")
- [value](https://docs.angularjs.org/api/auto/service/$provide#value)
- [service](https://docs.angularjs.org/api/auto/service/$provide#service)
- [factory](https://docs.angularjs.org/api/auto/service/$provide#factory)
- [provider](https://docs.angularjs.org/api/auto/service/$provide#provider)
- [decorator](https://docs.angularjs.org/api/auto/service/$provide#decorator)

Теперь пару слов о каждом, плюс примеры.

## constant и value

Оба типа служат для хранения каких либо изначальных настроек, конфигурационных опций и параметров по умолчанию. Значением может быть как примитив так и объект.

Отличие между **constant** и **value** заключается в том, что значение константы задается при определении и не может быть изменено другим путем. Плюс **константа** может быть внедрена в **config()**, а **value** может быть использована, только в последующих стадиях (например **run()**)

## service, factory и provider

По сути одно и тоже. Уже было довольно подробно описаны [тут](https://stepansuvorov.com/blog/2013/03/angularjs-%D1%87%D0%B5%D0%BC-%D0%BE%D1%82%D0%BB%D0%B8%D1%87%D0%B0%D0%B5%D1%82%D1%81%D1%8F-provider-factory-%D0%B8-service/ "AngularJs: чем отличается provider, factory и service") и [тут](https://stepansuvorov.com/blog/2014/12/angularjs-mistakes/ "Самые распространенные ошибки AngularJS разработчиков").

Если вы начинающий AngularJS разработчик (а этот пост именно для таковых) рекомендую ограничится пока только использованием **service**.

## декораторы

Декораторы или декорирование сервис провайдеров создано для модификации, переопределения, расширения сервисов на этапе конфигурации. Как мне кажется, наилучшее для них применение - это модификация сторонних библиотек, которые мы не хотим править напрямую.

Рекомендую ознакомиться с [вот этой](https://stepansuvorov.com/blog/2013/07/%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D0%B8-angularjs-%D0%B8-%D0%B2%D0%BD%D0%B5%D0%B4%D1%80%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9/ "Модули AngularJS и внедрение зависимостей") статьей о внедрении зависимостей и месте декораторов в этом процессе.

 

Если что-то не понятно - пожалуйста задавайте вопросы в комментариях - я постараюсь обновить пост исходя из вопросов.

## все части рубрики "С чего начать изучение AngularJS":

- [Часть1 - С чего начать изучение AngularJS.](https://stepansuvorov.com/blog/2012/12/%D1%81-%D1%87%D0%B5%D0%B3%D0%BE-%D0%BD%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%B8%D0%B7%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-angularjs/)
- [Часть2 – Шаблоны оживают.](https://stepansuvorov.com/blog/2013/06/start-with-angularjs-part2/)
- [Часть3 – Ох уж эти сервисы.](https://stepansuvorov.com/blog/2015/02/%D1%81-%D1%87%D0%B5%D0%B3%D0%BE-%D0%BD%D0%B0%D1%87%D0%B0%D1%82%D1%8C-angularjs-%D1%87%D0%B0%D1%81%D1%82%D1%8C3/)
