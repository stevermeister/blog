---
title: "Антипаттерны в промисах"
tags: "antipattern,javascript,promise"
date: "2014-03-13"
slug: "антипаттерны-в-промисах"
---

> Промисы просты в использовании, когда вы уже поняли принцип. Однако существуют некоторые подводные камни, которые доставят немало неприятностей.

Перевод/переработка статьи [Promise Anti-patterns](https://taoofcode.net/promise-anti-patterns/).

## Вложенные промисы (Nested Promises)

В коде может возникнуть ситуация целой кучи вложенных друг в друга промисов:

```javascript
loadSomething().then(function (something) {
  loadAnotherthing().then(function (another) {
    DoSomethingOnThem(something, another);
  });
});
```

Причина, по которой было сделано так, -  вам нужно было сделать что-то с результатами обоих промисов, а поставить их в цепочку было нельзя, так как **then()** возвращает только результат последнего.

Но на самом деле причина в том, что вы не знаете о методе **all()**.

**Так правильно**:

```javascript
q.all([loadSomething(), loadAnotherThing()]).spread(function (
  something,
  another
) {
  DoSomethingOnThem(something, another);
});
```

Намного проще, правда? Метод **q.all()** обработает переданные в него промисы и будет возвращен результат посредством метода **spread()**

## Разорваная цепочка (The Broken Chain)

Ваш код выглядит следующим образом:

```javascript
function anAsyncCall() {
  var promise = doSomethingAsync();
  promise.then(function () {
    somethingComplicated();
  });
  return promise;
}
```

Проблема: любая ошибка в методе _somethingComplicated_() не будет отловлена. Идея промисов - выполнение в цепочке: каждый вызов **then()** возвращает новый промис. То есть в данном примере вместо первоначального промиса, нужно возвращать последний промис, который вернет **then()**.

**Так правильно**:

```javascript
function anAsyncCall() {
  var promise = doSomethingAsync();
  return promise.then(function () {
    somethingComplicated();
  });
}
```

## Беспорядок в коллекции (The Collection Kerfuffle)

Имеется массив, стоит задача последовательно асинхронно обработать каждый элемент. У вас получится что-то наподобие рекурсии:

```javascript
function workMyCollection(arr) { var resultArr = []; function _recursive(idx) { if (idx &gt;= resultArr.length) return resultArr; return doSomethingAsync(arr[idx]).then(function(res) { resultArr.push(res); return _recursive(idx + 1); }); } return _recursive(0); }
```

Ух, это код совсем не понятен с первого взгляда.

Когда вы изначально не знаете сколько звеньев будет в цепочке промисов, то крайне полезны станут методы **map()** и **reduce()** объекта **Array**.

Помните, что **q.all()** принимает массив промисов и разрешает его в массив результатов? Мы можем просто применить **map()** в комбинации с **q.all()**:

```javascript
function workMyCollection(arr) {
  return q.all(
    arr.map(function (item) {
      return doSomethingAsync(item);
    })
  );
}
```

К сожалению, это не будет являться полным решением, так как такое решение убивает всю асинхронность вызовов и займет соответственно больше времени.

Если вам хочется запустить ваши промисы одновременно, то можно сделать **reduce**.

**Так лучше:**

```javascript
function workMyCollection(arr) {
  return arr.reduce(function (promise, item) {
    return promise.then(function (result) {
      return doSomethingAsyncWithResult(item, result);
    });
  }, q());
}
```

Вероятно тоже не идеальное решение, но уж точно лучше изначального.

## Тень промиса (The Ghost Promise)

Иногда возникают ситуации, когда метод в зависимости от условия выполняет что-то синхронно либо асинхронно, но для поддержания единства поведения всего метода вы создаете промис и для синхронной операции:

```javascript
var promise;
if (asyncCallNeeded) promise = doSomethingAsync();
else promise = Q.resolve(42);
promise.then(function () {
  doSomethingCool();
});
```

Это конечно не самый худший антипаттерн, но мы определенно можем сделать его лучше обернув значение/промис в **Q()**. Этот метод возьмет либо значение либо промис и обработает его соответственно:

```javascript
Q(asyncCallNeeded ? doSomethingAsync() : 42)
  .then(function (value) {
    doSomethingGood();
  })
  .catch(function (err) {
    handleTheError();
  });
```

## Пристрастный отлов ошибок (The Overly Keen Error Handler)

Метод **then()** принимает 2 параметра-обработчика: успешного вызова и вызова с ошибкой. Вероятно где-то у вас встретится такой код:

```javascript
somethingAsync.then(
  function () {
    return somethingElseAsync();
  },
  function (err) {
    handleMyError(err);
  }
);
```

Проблема заключается в том, что если ошибка случится в первом обработчике, то она не будет направлена на обработчик ошибок.

**Так правильно**:

```javascript
somethingAsync
  .then(function () {
    return somethingElseAsync();
  })
  .then(null, function (err) {
    handleMyError(err);
  });
```

или с использованием **catch()**:

```javascript
somethingAsync
  .then(function () {
    return somethingElseAsync();
  })
  .catch(function (err) {
    handleMyError(err);
  });
```

## Забытый промис (The Forgotten Promise)

Ситуация: вы вызываете метод, который возвращает промис, но забывая об этом  создаете еще один:

```javascript
var deferred = Q.defer();
doSomethingAsync().then(
  function (res) {
    res = manipulateMeInSomeWay(res);
    deferred.resolve(res);
  },
  function (err) {
    deferred.reject(err);
  }
);
return deferred.promise;
```

Это ломает изначальную задумку, ради которой промисы и создавались.

**Так правильно**:

```javascript
return doSomethingAsync().then(function (res) {
  return manipulateMeInSomeWay(res);
});
```
