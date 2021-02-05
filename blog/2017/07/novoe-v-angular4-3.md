---
title: "Новое в Angular4.3"
tags: "Angular"
date: "2017-07-26"
slug: "новое-в-angular4-3"
---

- **[HttpClient](https://angular.io/guide/http)** _ принципиально новый клиент, который переехал из отдельного модуля в подсекцию common ('**@angular/common/http**'):
    - позволяет получить данные сразу в JSON
    - типизировать возвращаемые данные вывод
    - появляются интерсепторы
    - задание дефолтных заголовков (например токена авторизации)
    - подписаться события прогресса
- Новые гарды роутера: **GuardsCheckStart**, **GuardsCheckEnd**, **ResolveStart**, **ResolveEnd**, **NavigationStart**
- Опция для [отключения анимации в детях](https://github.com/angular/angular/issues/16483)
- Специальный CSS селектор **::ng-deep**, который является альтернативой **\>>>**
