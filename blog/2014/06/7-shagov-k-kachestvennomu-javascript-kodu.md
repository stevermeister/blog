---
title: "7 шагов к качественному JavaScript коду"
tags: "javascript"
date: "2014-06-09"
slug: "7-шагов-к-качественному-javascript-коду"
---

пост представляет собой резюме на  статью "[7 steps to better JavaScript](https://www.creativebloq.com/netmag/7-steps-better-javascript-51411781 "creativebloq.com")".

## Шаг 1 - Модульность

Любой крупный проект необходимо разбивать на составные части - модули. Это значительно упрощает работу над проектом. Для реализации [модульного подхода](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript) мы можем использовать как специальные библиотеки типа [RequireJs](https://requirejs.org/), так и встроенные возможности компонентного фреймворка.

В каждом модуле ставим оператор ['use strict'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode "developer.mozilla.org"), тем самым давая понять интерпретатору что мы хотим работать в "строгом режиме", который фиксит некоторые неточности языка и выдает больше ошибок в случае неверного использования.

## Шаг 2 - Документированность

Чтобы код хорошо читался не только сейчас, а и через месяц, - его следует дополнять комментарияеми. Используя [JSDoc](https://usejsdoc.org/ "usejsdoc.org") формат можно не только придерживается единого формата описания для всей команды, но еще потом по нему автоматически генерировать документацию всего проекта.

Но тут тоже нужно знать меру: имхо, отдельные методы комментировать хорошо; а вот строчки кода - только в самом крайнем слечае.

## Шаг 3 - Стилистика

Также для качества кода проекта необходимо, чтобы вся команда писала код в одном стиле. Это касается в первую очередь именования переменных/методов, расстановки пробелов/переносов, использования кавычек. Для проверки стилистики существует прекрасный инструмент [JSHint](https://www.jshint.com/ "jshint.com"), который можно под себя(команду) удобно настроить.

## Шаг 4 - Тесты

Качественный код должет содержать юнит-тесты. В помощь спешат библиотеки [jasmine](https://jasmine.github.io/), [mocha](https://visionmedia.github.io/mocha/) и тест драйвер [karma](https://karma-runner.github.io/0.12/index.html).

## Шаг 5 - Покрытие

Следующим шагом после написания тестов идет оценка покрытия кода этими тестами. Ведь мы должны убедится в том, что мы тестируем весь функционал и ничего не забыли. Для этого можно использовать [istambul](https://gotwarlost.github.io/istanbul/) анализатор, который покажет процент покрытия кода тестами сразу по нескольким параметрам.

## Шаг 6 - Автоматизация

Почти всю рутину можно поручить на инструмент сборки - [grunt](https://gruntjs.com/), [gulp](https://gulpjs.com/) и остальные варианты. Они для вас выполнят валидацию стилей, тесты и прочие полезные мелочи.

## Шаг 7 - Отлов ошибок

Заключающий шаг. Про ошибки так же не нужно забывать. Я уже писал довольно подробный [пост](https://stepansuvorov.com/blog/2013/04/%D0%B2%D1%81%D0%B5-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8-javascript-error-%D0%B2-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B5/ "Все для обработки JavaScript error в проекте") на эту тему.

## Шаг 7 +1 - Ревью

То, чего не было в оригинале статьи, но то, что не могу не добавить - код ревью, совместный анализ кода, серьезно улучшает качество вашего кода и качество кода команды в целом. Это можно реализовать, как путем совместного просмотра кода за одной машиной, так и путем коментариев в репозитории.
