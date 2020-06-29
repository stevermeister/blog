---
title: "Как запустить Angular2 ChangeDetection вручную"
tags: "Angular2,ChangeDetection"
date: "2016-12-06"
---

Небольшая заметка по мотивам [ответа на stackoverflow](https://stackoverflow.com/a/34829089/274500).

Внедрив следующие сервисы в компонент

**ApplicationRef**, **NgZone**, **ChangeDetectorRef**,

мы можем добиться следующего:

- [ApplicationRef.tick()](https://angular.io/docs/ts/latest/api/core/index/ApplicationRef-class.html#!#tick-anchor) - то есть запуск **changeDetection** на корневом элементе, то есть соотвественно запуск на всех элементах дерева(аналог  **$rootScope.$digest()** )
- [NgZone.run(callback)](https://angular.io/docs/ts/latest/api/core/index/NgZone-class.html#!#run-anchor) - тоже самое что и предыдущий вариант, только с выполнением колбэка (аналог **$rootScope.$apply(callback)** )
- [ChangeDetectorRef.detectChanges()](https://angular.io/docs/ts/latest/api/core/index/ChangeDetectorRef-class.html#!#detectChanges-anchor) - запуск механизма обнаружения изменений только на текущем элементе ( аналог **$scope.$digest()** )

Ну и так, бонусом: отсоединение и присоединение обратно детектора изменений конкретного компонента:

```javascript 
  constructor(private cd: ChangeDetectorRef) { this.cd.detach(); setInterval(() => { this.cd.detectChanges(); }, 5000); }  
 ```
