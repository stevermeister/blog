---
title: "Запукаем Protractor на Browserstack"
tags: "AngularJs,BrowserStack,javascript,protractor,Хочу сделать мир лучше"
date: "2015-01-19"
---

Небольшая заметка о том, как запустить **protractor** тесты на разных браузерах используя сервис **Browserstack**.

Подробно о **protractor** можно почитать [тут](https://stepansuvorov.com/blog/2014/02/angularjs-protractor/ "Тестируем AngularJS используя Protractor") и [тут](https://stepansuvorov.com/blog/2014/11/protractor/ "Автоматизируем тестирование AngularJS с Protractor").

## Настройка конфига

Ключевые опции это **capabilities** и **seleniumAddress**:

\[javascript\] capabilities: { //эти параметры можно получить на странице - https://www.browserstack.com/automate 'browserstack.user' : 'my\_user\_name', 'browserstack.key' : 'my\_secret\_key',

'browserstack.local' : 'true',

'browser' : 'Chrome', 'browser\_version' : '36.0', 'os' : 'OS X', 'os\_version' : 'Mavericks', 'resolution' : '1024x768' },

seleniumAddress: 'https://hub.browserstack.com/wd/hub' \[/javascript\]

Более подробно о возможных параметрах [тут](https://www.browserstack.com/automate/capabilities "browserstack.com").

Подробный лог (например: для отладки) можно включить следующей опцией:

\[javascript\] capabilities: { //... 'browserstack.debug' : 'true', //... }, \[/javascript\]

## Настройка Browserstack для локального запуска

Достаточно скачать([тут](https://www.browserstack.com/automate/node#setting-local-tunnel "browserstack.com")) и запустить файл:

\[bash\] ./BrowserStackLocal my\_secret\_key localhost,3000,0 \[/bash\]

3000 - номер порта, на котором локально проект (только для случая локального тестирования)

## Запуск протрактора

Тут ничего нового, так же команда с указанием конфиг-файла:

\[bash\] protractor protractor-browserstack.config.js \[/bash\]

 

**UPD:** Если вы тестируете реальный сайт (не локальное окружение), то **BrowserStackLocal** запускать не нужно. Но в любом случае его лучше иметь для локальной отладки.

**UPD2**: Если вы хотите использовать несколько браузеров (и запускать тесты параллельно) используйте опцию **multiCapabilities** вместо **capabilities**.

_\* Если что, автоматические тесты - это платная услуга, но ее можно попробовать бесплатно (на данный момент предоставляется 100 минут бесплатно)_
