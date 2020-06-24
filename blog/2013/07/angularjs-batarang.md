---
title: "AngularJs Batarang"
tags: "AngularJs,batarang,chrome,javascript,Uncategorized"
date: "2013-07-17"
---

[![](images/angular-batarang1-300x75.png "angular-batarang")](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk "chrome web store")

Если вы уже работаете с AngularJS, то наверняка заметили, что стандартные инструменты веб разработчика не предоставляют необходимую функциональность, иногда хочется чего-то более специализированного на конкретных особенностях фреймворка. И нам спешит на помощь расширение для **Chrome** - **[Angular Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)**.

Инструмент еще достаточно сырой, сами авторы этого не скрывают: "_We are releasing this early version because we'd love to get your feedback. Let us know what you think and what we should add or improve in the [AngularJS Google Group](https://groups.google.com/forum/?fromgroups#!forum/angular)."_ Но все же уже можно начинать пробовать на вкус.

Итак что же нам дает использование **Batarang'a**?

После установки у вас должна появиться новая вкладка в панели инструментов разработчика. ![](images/Screen-Shot-2013-07-10-at-8.11.07-PM1.png "angular batarang developer tools")

Перейдя по ней, вы увидите 4 функциональные вкладки: **Models**, **Performance**, **Dependencies**, **Options**; вкладку помощи и еще одну вкладку активации расширения (_зачем это было сделано в виде вкладки не совсем ясно_)

![](images/Screen-Shot-2013-07-10-at-8.18.28-PM.png "Angular Batarang вкладки")

Убедившись, что мы находимся на странице нашего **AngularJS** приложения, активируем **Batarang** (_жмем галочку **Enable**_) - что вызовет перегрузку страницы приложения и инструмент начнет инспектирование и сбор информации.

Теперь давайте посмотрим на вкладки подробнее.

## Models

![](images/Screen-Shot-2013-07-12-at-6.38.23-PM-1024x314.png "angular batarang models tab")

В данной вкладке мы видим дерево скоупов(**scopes**), с прикрепленными к ним данными. Первый скоуп в дереве - **rootScope**. При клике на ссылку конкретного скоупа справа отобразятся его данные. Если кликнуть на значок **<**, то перейдем на конкретный элемент DOM(режим инспектора элементов), с которым связан скоуп.

При наличии нескольких атрибутов **ng-app** можно выбрать какое дерево отображать.

[![](images/Screen-Shot-2013-07-12-at-8.21.55-PM.png "Screen Shot 2013-07-12 at 8.21.55 PM")](https://stepansuvorov.com/blog/wp-content/uploads/2013/07/Screen-Shot-2013-07-12-at-8.21.55-PM.png)

В одной из последний версий расширения добавилась кнопка \[**Enable Inspector**\]. Назначение ее мне пока еще не совсем понятно.

 

## Performance

![](images/Screen-Shot-2013-07-12-at-7.07.53-PM-1024x219.png "angular batarang tab performance")

В данной вкладке фактически дублируется дерево скоупов, только теперь представлена информация о том, какие выражения(**expressions**) подключены к каким скоупам. Ссылка toggle используется для сворачивания подэлементов (сразу видно что продукт разрабатывался программистами и специалисты по юзабилити пока к этому руку не приложили)

Справа можно заметить сравнение производительности всех выражений приложения. информация обновляется динамически.

 

## Dependencies

Вкладка зависимостей визуализует зависимости сущностей/сервисов приложения. Наведя мышкой на один из сервисов можно увидеть подсвеченные зависимости выбранного сервиса: сервисы, которые зависят от выбранного подсвечиваются **зеленым**, сервисы от которых зависит выбранный сервис - **красным**.

Исходя из того, много ли в вашем приложении сервисов и зависимостей между ними, схема может быть как простая, так и довольно сложная:

[![](images/Screen-Shot-2013-07-12-at-7.30.01-PM-261x300.png "Screen Shot 2013-07-12 at 7.30.01 PM")](https://stepansuvorov.com/blog/wp-content/uploads/2013/07/Screen-Shot-2013-07-12-at-7.30.01-PM.png)[![](images/Screen-Shot-2013-07-12-at-7.31.13-PM-294x300.png "Screen Shot 2013-07-12 at 7.31.13 PM")](https://stepansuvorov.com/blog/wp-content/uploads/2013/07/Screen-Shot-2013-07-12-at-7.31.13-PM.png)

 

## Options

Вкладка опций, где можно включить **отображение** (по сути отрисовывание цветной рамки по контуру) **приложений**(если их несколько на странице), **скоупов** и связываний(**bindings**). Для каждой сущности свой цвет: зеленый, красный и синий соответственно.

![](images/Screen-Shot-2013-07-12-at-7.46.00-PM-300x110.png "Screen Shot 2013-07-12 at 7.46.00 PM")

Также на этой вкладке выводится информация о версии Ангулара и использовании [CDN](https://ru.wikipedia.org/wiki/Content_Delivery_Network "wiki").

![](images/Screen-Shot-2013-07-12-at-7.50.14-PM-300x151.png "angular batarang options info")

 

Какие еще плюшки?

Первая - дополнительная секция **AngularJS Properties** в инспекторе элементов, которая отображает Ангулар свойства

![](images/Screen-Shot-2013-07-12-at-7.55.22-PM-300x98.png "angular batarang elements")

[![](images/Screen-Shot-2013-07-12-at-7.59.22-PM-300x252.png "angular batarang anular element options")](https://stepansuvorov.com/blog/wp-content/uploads/2013/07/Screen-Shot-2013-07-12-at-7.59.22-PM.png)

 

Вторая - дополнение объекта консоли(**console**) переменной **$scope**, которая является ссылкой на активный скоуп. Если не один скоуп не выбран - то она будет являтся ссылкой на **$rootScope**.

![](images/Screen-Shot-2013-07-12-at-8.04.11-PM.png "Screen Shot 2013-07-12 at 8.04.11 PM")

То есть довольно удобный доступ к данным скоупа, а также возможность обновления(**$scope.$apply()**) и выполнения других действий по отладке приложения.

 

 

Презентационное видео от разработчиков:

<iframe src="//www.youtube.com/embed/q-7mhcHXSfM" frameborder="0" width="560" height="315"></iframe>
