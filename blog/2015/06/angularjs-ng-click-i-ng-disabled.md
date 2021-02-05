---
title: "AngularJS: ng-click и ng-disabled"
tags: "AngularJs,javascript"
date: "2015-06-22"
slug: "angularjs-ng-click-и-ng-disabled"
---

Учтите что **ng-disable** работает **только на элементах формы**, поэтому тут

```html
<div ng-click="doAction()" ng-disabled="buttonDisable">Click Me</div>

директива **ng-click** отрабатывает клик.

Если необходимо использовать **ng-disable** могу предложить такой вот хак:

```html
<div ng-click="buttonDisable || doAction()" ng-disabled="buttonDisable"></div>
```

 

**P.S.**: Большоя спасибо [Vitalii Hudyma](https://twitter.com/katmai7) за планкер с кодом.
