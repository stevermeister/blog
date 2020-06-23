---
title: "Шорткаты адресной строки браузера"
tags: "browser,chrome,search,Хочу сделать мир лучше"
date: "2014-06-29"
---

На хабре уже мелькала [статья](http://habrahabr.ru/post/218051/ "habrahabr.ru") в тему. Суть в том, что мы делаем поисковый запрос, используя поисковый механизм конкретного сайта, до перехода на сам сайт в адресной строке браузера.

Проще будет на примере. Мы хотим запустить поиск по хабру. Переходим в строку браузера и пишем "h" и далее пробел, и о чудо:

![](images/p9vHyY3QpQ8gRopPMcIUJOMAI1J5a-WLvEexSauTUh8.png "chrome habr search")

мы видим что мы уже ищем по хабру.

Как сделать это чудо? Оказывается в chrome-браузере(как и в Firefox) уже есть встроенная возможность создавать такие алиасы.

Для того, чтобы создать такой шорткат в chrome, открываем [chrome://settings/searchEngines](http://chrome//settings/searchEngines), затем добавляем новый поисковый движок **habr**, ключевое слово - **h**, ссылка с параметром -  **http://habrahabr.ru/search/?q=%s**. Вот и все.

![](images/FJDD1XjLih8ThacK3d-8VBwOgAsqNYdwN5morWwOqvA1.png "habr search")

Пробуем(в адресной строке браузера):

- h \[пробел\] angular
- h \[пробел\] рекурсия

Полезный набор шорткатов:

- **wiki** - Wikipedia - http://en.wikipedia.org/wiki/Special:Search?search=%s
- **tr** - google translate - http://translate.google.com/?source=osdd#auto|auto|%s
- **h** - habrahabr - http://habrahabr.ru/search/?q=%s
- **jq** -jQuery - http://jquery.com/%s
- **calendar** - google calendar - https://www.google.com/calendar
- **s** - Stackoverflow - http://stackoverflow.com/search?q=%s
- **вики** - Википедия - http://ru.wikipedia.org/wiki/Special:Search?search=%s
- **bug** - любимый баг трекер ( например для поиска по ID )
