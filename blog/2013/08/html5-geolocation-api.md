---
title: "Получаем координаты используя HTML5 Geolocation API"
tags: "geolocation,html5,javascript"
date: "2013-08-16"
---

Небольшая заметка с примерами использования возможностей геолокации современных браузеров.

Все что нас интересует происходит с объекте **navigator.geolocation**, поэтому чтобы проверить поддерживает ли браузер данную возможность можно выполнить следующий код:

```javascript
if ("geolocation" in navigator) {
  /\* geolocation поддерживается \*/
} else {
  /\* geolocation НЕ поддерживается \*/
}
```

Для получения текущего местоположения используется метод **navigator.geolocation.getCurrentPosition()** имеющий следующий синтаксис:

```javascript
getCurrentPosition(success, error, options)
```

где

- success - колбэк на успешное получение координат
- error - колбэк обработки ошибки
- options - опции

Самый простой пример получения координат:

```javascript
navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
});
```

Пример на [jsfiddle](https://jsfiddle.net/STEVER/372Rc/).

Также объект **geolocation** содержит метод **watchPosition()**, который устанавливает хэндлер на событие изменения локации. Принимает параметры аналогичные параметрам метода **getCurrentPosition()**.

[Еще один](https://jsfiddle.net/STEVER/372Rc/1/ "jsfiddle") пример с использованием google maps.

 

Полезные ссылки:

[HTML5 Geolocation API(Presentation from HTML5 Camp)](https://www.slideshare.net/dpeua/html5-geolocation-api)

[Using geolocation](https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation "developer.mozilla.org")

[The Geolocation API](https://diveintohtml5.info/geolocation.html "diveintohtml5.info")
