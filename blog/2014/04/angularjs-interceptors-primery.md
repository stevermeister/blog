---
title: "Примеры интерсепторов AngularJS"
tags: "AngularJs,interceptor,javascript"
date: "2014-04-01"
slug: "angularjs-interceptors-примеры"
---

Насколько вам известно:  **\$http\***сервис **AngularJs** позволяет общаться с сервером и делать **HTTP\***запросы. В некоторых случаях необходимо перехватывать запрос и обрабатывать его до отправки на сервер, или наоборот: мы хотим перехватить ответ и модифицировать его. Также хорошим примером может послужить глобальная обработка http-ошибок. Именно для таких случаев в **AngularJS** и созданы интерсепторы(**interceptors**).

Пост написан на основе переведенной/переработанной статьи Naor Yehudaey "[Interceptors in AngularJS and Useful Examples](https://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/)"

## Что такое Интерсепторы?

**\$httpProvider** содержит массив интерсепторов. Интерсептор, если по простому - это стандартная фабрика, которая зарегистрированна в этот массив. Вот так можно создать интерсептор:

```javascript
module.factory('myInterceptor', ['$log', function($log) {
  $log.debug('$log используется чтобы показать что это стандартная фабрика, в которую можно инжектить сервисы');
  var myInterceptor = { .... .... .... };
  return myInterceptor;
}]);
```

И затем добавить его в интерсепоторы **\$httpProvider**:

```javascript
module.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("myInterceptor");
  },
]);
```

По области применения различают следующие интерсепоторы:

- **перехват запроса** ( реализуя функцию **request** ) - этот метод вызывается до того как $http сервис пошлет запрос на сервер, то есть вы можете модифицировать сам запрос и выполнить какие-то дополнительные действия. Функция **request** получает параметром конфиг запроса и возвращает объект конфигурации либо промис. Если функция возвращает не валидный объект конфигурации, то $http прервется и бросит ошибку-исключение.
- **перехват ответа** ( реализуя функцию **response** ) - метод вызывается сразу после того как $http получил ответ от сервера, то есть вы можете изменять ответ. Функция **response** принимает конфиг запроса и должна вернуть объект ответа либо промис. Объект ответа состоит из конфига запроса, заголовков, статуса и возвращенных с сервера данных. Аналогично предыдущему: в случае не валидного аутпута функции - $http кинет ошибку.
- **перехват ошибки запроса** ( реализуя функцию **requestError**) - вызывается, когда запрос не может быть послан либо отменен другим интерсептором. Это может быть использовано для восстановления/возвращения в предыдущее состояние, например: индикатор удаления
- **перехват ошибки ответа** ( реализуя функцию **responseError**) - вызывает, когда запрос к серверу завершился неудачей, отменен интерсептором запроса либо предыдущим интерсептором ответа. В этих случаях интерсептор может помочь восстановить соединение с сервером.

## Асинхронные операции

Иногда возникает необходимость делать асинхронные операции внутри интерсептора. К счастью, AngularJS позволяет возвращать **промис**, который будет разрешен позже.

```javascript
module.factory("myInterceptor", [
  "$q",
  "someAsyncService",
  function ($q, someAsyncService) {
    var requestInterceptor = {
      request: function (config) {
        return someAsyncService.doAsyncOperation().then(
          function () {
            return config;
          },
          function () {
            return config;
          }
        );
      },
    };
    return requestInterceptor;
  },
]);
```

В этом примере **интерсептор запроса** делает асинхронные действия и обновляет конфиг согласно результатов. Затем **\$http** продолжает выполнение с модифицированным конфигом.

Аналогично с **интерсептором ответа**:

```javascript
module.factory("myInterceptor", [
  "$q",
  "someAsyncService",
  function ($q, someAsyncService) {
    var responseInterceptor = {
      response: function (response) {
        return someAsyncService.doAsyncOperation().then(
          function () {
            return response; // асинхронная операция выполнена успешно
          },
          function () {
            return response; //асинхронная операция вернула ошибку
          }
        );
      },
    };
    return responseInterceptor;
  },
]);
```

**Примечание**: ошибка асинхронно операции не обязательно должна становиться ошибкой **\$http** запроса.

Далее рассмотрим некоторые примеры использования интерсепторов.

## Инжектор сессии (используя интерсептор запроса)

Существует 2 способа организации серверной аутентификации на клиенте: традиционный, основанный на кукисах, и способ основанный на использовании **токена**:  при логине пользователь получает токен сессии с сервера, который идентифицирует пользователя на стороне сервера и посылается с каждым запросом.

Создадим интерсептор **sessionInjector**, который будет добавлять заголовок "_x-ssession-token_" к каждому запросу (если пользователь залогинен):

```javascript
module.factory("sessionInjector", [
  "SessionService",
  function (SessionService) {
    var sessionInjector = {
      request: function (config) {
        if (!SessionService.isAnonymus) {
          config.headers["x-session-token"] = SessionService.token;
        }
        return config;
      },
    };
    return sessionInjector;
  },
]);
module.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("sessionInjector");
  },
]);
```

И теперь посылая GET-запрос :

```javascript
$http.get("https://api.github.com/users/naorye/repos");
```

имеем объект конфигурации до прохождения **sessionInjector**:

```javascript
{
  "transformRequest": [ null ],
  "transformResponse": [ null ],
  "method": "GET",
  "url": "https://api.github.com/users/naorye/repos",
  "headers": { "Accept": "application/json, text/plain, \*/\*" }
}
```

и после:

```javascript
{
  "transformRequest": [ null ],
  "transformResponse": [ null ],
  "method": "GET",
  "url": "https://api.github.com/users/naorye/repos",
  "headers": { "Accept": "application/json, text/plain, \*/\*", "x-session-token": 415954427904 }
}
```

## Временная метка (используя интерсепторы запроса и ответа)

Давайте попробуем измерить время затраченное на запрос к серверу используя интерсепторы. Это можно сделать добавляя временную метку к каждому запросу и ответу:

```javascript
module.factory("timestampMarker", [
  function () {
    var timestampMarker = {
      request: function (config) {
        config.requestTimestamp = new Date().getTime();
        return config;
      },
      response: function (response) {
        response.config.responseTimestamp = new Date().getTime();
        return response;
      },
    };
    return timestampMarker;
  },
]);

module.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("timestampMarker");
  },
]);
```

И теперь мы можем посчитать:

```javascript
$http
  .get("https://api.github.com/users/naorye/repos")
  .then(function (response) {
    var time =
      response.config.responseTimestamp - response.config.requestTimestamp;
    console.log("The request took " + time / 1000 + " seconds.");
  });
```

Код примера можно найти [тут](https://raw.githubusercontent.com/naorye/web-dev-easy-src/86b9d00ce8fff6bb7c2b8353550c621787dcc72a/source/code/interceptors-in-angularjs-and-useful-examples/timestamp-marker.html "github"). Поиграться в песочнице [тут](https://jsbin.com/xenem/1/ "jsbin").

## Восстановление запроса (используя интерсептор ошибки запроса)

Для того чтобы продемонстрировать интерсептор ошибки запроса мы должны имитировать ситуацию, в которой предыдущий интерсептор отклонил запрос. Наш интерсептор ошибки запроса получит причину отклонения и восстановит запрос.

Давайте создадим 2 интерсептора: requestRejector и requestRecoverer:

```javascript
module.factory("requestRejector", [
  "$q",
  function ($q) {
    var requestRejector = {
      request: function (config) {
        return $q.reject("requestRejector");
      },
    };
    return requestRejector;
  },
]);

module.factory("requestRecoverer", [
  "$q",
  function ($q) {
    var requestRecoverer = {
      requestError: function (rejectReason) {
        if (rejectReason === "requestRejector") {
          // Восстановление запроса
          return {
            transformRequest: [],
            transformResponse: [],
            method: "GET",
            url: "https://api.github.com/users/naorye/repos",
            headers: { Accept: "application/json, text/plain, */*" },
          };
        } else {
          return $q.reject(rejectReason);
        }
      },
    };
    return requestRecoverer;
  },
]);

module.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("requestRejector"); // Удалении 'requestRecoverer' приведет к ошибке $http
    $httpProvider.interceptors.push("requestRecoverer");
  },
]);
```

Мы получим успешно выполненный запрос:

```javascript
$http.get("https://api.github.com/users/naorye/repos").then(
  function () {
    console.log("success");
  },
  function (rejectReason) {
    console.log("failure");
  }
);
```

[Код](https://raw.githubusercontent.com/naorye/web-dev-easy-src/86b9d00ce8fff6bb7c2b8353550c621787dcc72a/source/code/interceptors-in-angularjs-and-useful-examples/request-recover.html "github"), [песочница](https://jsbin.com/hihak/1/ "jsbin").

## Восстановление сессии (используя интерсептор ошибки ответа )

В жизни нашего сингл-пэйдж бывают случаи утери сессии. Такое может случится из-за истечения времени жизни сессии или ошибки сервера. Давайте создадим интерсептор, который восстановит сессию и заново автоматически отправит первоначальный запрос(для случая когда время сессии истекло).

Для примера давайте примем что http-статус код для случая окончания времени действия сесии - 419.

```javascript
module.factory("sessionRecoverer", [
  "$q",
  "$injector",
  function ($q, $injector) {
    var sessionRecoverer = {
      responseError: function (response) {
        // Время сессии истекло
        if (response.status == 419) {
          var SessionService = $injector.get("SessionService");
          var $http = $injector.get("$http"); // Создаем новую сессию // и авторизируем пользователя
          return SessionService.login().then(function () {
            // Когда сессия восстановлена делаем запрос еще раз
            return $http(response.config);
          });
        }
        return $q.reject(response);
      },
    };
    return sessionRecoverer;
  },
]);

module.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("sessionRecoverer");
  },
]);
```

Таким образом, если запрос не удается из-за того что время сессии истекло, то интерсептор создаст новую сессию и повторит запрос.

## Резюмируя

В этой статье объясняется что такое интерсепеторы AngualrJS и раскрывается идея их использования на примерах из реального мира. Надеюсь, это поможет вам в разработке.
