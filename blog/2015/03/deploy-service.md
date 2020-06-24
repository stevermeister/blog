---
title: "В поисках сервиса для деплоя"
tags: "bitbucket,deploy,github,online,tool,Хочу сделать мир лучше"
date: "2015-03-03"
---

[![semaphore-logo](images/logo-661a8bb0455b3c85a019aa830dd1b109.png)](https://semaphoreapp.com/ "https://semaphoreapp.com/")  [![dploy-logo](images/Screenshot-2015-03-03-13.40.59.png)](https://dploy.io/ "https://dploy.io/")  [![ftploy-logo](images/Screenshot-2015-03-03-13.41.25.png)](https://ftploy.com/ "https://ftploy.com/")  [![codeship-logo](images/Screenshot-2015-03-03-13.43.17.png)](https://codeship.com/ "https://codeship.com/")

На данным момент мы для своего [проекта](https://www.studytube.nl/ "https://www.studytube.nl/") используем [semaphore](https://semaphoreapp.com/ "https://semaphoreapp.com/"). Этот же сервис я использую и для своих личный проектов. Задача на него ставиться простая: при каждом пуше в мастер - выливаем код в продакшен, предварительно выполнив тесты и подготовив билд.

Из-за периодических тормозов, отсутствия возможности создания общей конфигурации для нескольких приложений (в нашем случае у нас 7 разных приложений, которые собираются и деплоятся одними и теме же командами, через один и тот же распределяющий сервер) и не совсем интуитивного интерфейса, задался вопросом: есть ли что-то более интересное, при этом по прежнему легкое и дружелюбное (читать бесплатное) по отношению к опенсорс.

Попробовали как альтернативу использовать [Codeship](https://codeship.com/ "https://codeship.com/") - не понравилось.

Потом еще наткнулся на [dploy](https://dploy.io/ "https://dploy.io/") и [ftploy](https://ftploy.com/ "https://ftploy.com/") - не впечатлило.

Если у вас есть опыт успешного использования какого-либо подобного сервиса - поделитесь пожалуйста в комментариях.

 

**UPD:** после того как узнал, что в **semaphore** можно делать даже так:

\[shell\]sudo apt-get install -yqq ftp\[/shell\]

решил пока остаться на нем.
