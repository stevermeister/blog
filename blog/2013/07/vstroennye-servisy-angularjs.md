---
title: "Встроенные сервисы AngularJS"
tags: "AngularJs,javascript"
date: "2013-07-27"
slug: "встроенные-сервисы-angularjs"
---

Встроенные сервисы или сервисы основного модуля(**ng**) AngulartJS.

**$window** - ссылка на глобальный объект window **$document** - jQuery обертка элемента window.document **$location** - синхронизация URL с адресной строкой браузера **$timeout(fn[, delay][, invokeApply])** - обертка для метода window.setTimeout **$sniffer, $browser** - "приватные" сервисы для внутреннего использования **$q** - сервис работы с асинхронными операциями (promise/deferred) **$rootScope** - сервис получения доступа к root scope **$http(config)** - сервис взаимодействия по протоколу HTTP (XMLHttpRequest/JSONP) **$httpBackend** - низкоуровневый аналог $http (может быть использован в тестах) **$route**_ сервис роутинга - связывания URL и контроллеров приложения **$routeParams** - сервис доступа к параметрам из URL **$cacheFactory(cacheId[, options])** - создания и получения доступа к кэш-хранилищам **$templateCache** - сервис кеширования шаблонов **$controller(constructor, locals)** - вызов контроллера **$anchorScroll** - автоматический скрол к конкретному элементу(до сих пор думаю зачем это было вынесено в сервис) **$filter(name)** - создание фильтров используемых во вью **$parse(expression)** - конвертирует Ангулар-выражение(expression) в функцию **$interpolate(text[, mustHaveExpression])** - обрабатывает текст содержащий выражения(для этого использует **$parse**) **$compile(element, transclude, maxPriority)** - копилирует шаблон, обрабатывает директивы, связывает события. Использует **$interpolate** **$exceptionHandler(exception[, cause])** - сервис эксепшенов **$log** - логирование
