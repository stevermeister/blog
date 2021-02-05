---
title: "Angular2: Синхронная асинхронность MockBackend"
tags: "Angular2,MockBackend"
date: "2017-01-20"
slug: "angular2-синхронная-асинхронность-mockbackend"
---

Решил сделать заметку по не очевидному моменту юнит-тестирования **Angular2**, а именно: когда вы мокаете **Http** сервис, заменяя **XHRBackend** на **MockBackend**:

```javascript 
  TestBed.configureTestingModule({ imports: [HttpModule], providers: [{provide: XHRBackend, useClass: MockBackend}] });  
 ```

а потом с помощью **mockBackend** подменяете ответ от сервера:

```javascript 
  mockBackend.connections.subscribe((connection: MockConnection) => { connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(mockUser)}))); })  
 ```

**subscribe** на http Observable становится внезапно **синхронным**:

```javascript 
  console.log(1); this._http.get('/').subscribe((data) => { console.log(2); }); console.log(3);  
 ```

соотвественно выведет: 1 2 3.

Подробно вопрсос освещен на [стеке](https://stackoverflow.com/questions/41273244/angular-testing-http-with-mockbackend-is-async-really-required).
