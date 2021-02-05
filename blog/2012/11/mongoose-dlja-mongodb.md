---
title: "Mongoose для MongoDb"
tags: "MongoDB,mongoose"
date: "2012-11-27"
slug: "mongoose-для-mongodb"
---

![](images/mongoose.jpg "mongoose")

**Mongoose** - это **ORM** для **MongoDb** сделанная под **node.js**.

Традиционно начнем разбор с создания песочницы.

Mongoose устанавливается как модуль к node.js:

```
$ npm install mongoose
```

После установки проверяем подключается ли модуль, пишем в [test.js](https://stepansuvorov.com/blog/2012/11/%D0%BF%D0%B5%D1%81%D0%BE%D1%87%D0%BD%D0%B8%D1%86%D0%B0-%D0%B4%D0%BB%D1%8F-mongodb/) файлик следующий код:


```javascript
var mongoose = require('mongoose');
console.log(mongoose.version);
```

и если все прошло успешно, то должно выдать текущую версию **mongoose**.

Чтобы подключится к базе, создаем соединение:

```javascript
var db = mongoose.createConnection('mongodb://localhost/test');
//общий синтаксис метода _createConnection_ выглядит слудеющим образом:
//mongoose.connect('mongodb://username:password@host:port/database').
```

и открываем его:

```javascript
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback () {
    console.log("Connected!")
});
```

В mongoose все завязано на 2х ключевых понятиях Схема([Schema](https://mongoosejs.com/docs/guide.html)) - описание сущности и Модель - сама сущность.

Создадим схему для комментариев:

```javascript
var UserSchema = new mongoose.Schema( {
    name: { type: String, default: "hahaha" },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date },
    buff: Buffer
} );
```

Каждое поле карактеризуется типом **SchemaTypes** и может иметь дополнительные характеристики: default, min и max(для Number), match и enum(для String), index и unique(для индексов).

Подробнее о типах можно почитать [тут](https://mongoosejs.com/docs/schematypes.html).

Теперь создадим модель по схеме:

```javascript
var User = db.model("User",UserSchema)
```

и экземпляр для данной модели:

```javascript
var newUser = new User({ name: "Alice", age: 21})
```

мы можем расширить схему методами:

```javascript
UserSchema.methods.speak = function () {
    var greeting = this.name
        ? "My name is " + this.name
        : "I don't have a name"
    console.log(greeting);
}

var User = db.model("User",UserSchema)
var newUser = new User({ name: "Alice", age: 21})
newUser.speak();
```

Чтобы сохранить нашего пользователя в базу, мы должны вызвать метод _save_:

```javascript
newUser.save(function (err, newUser) {
    if (err){
        console.log("Something goes wrong with user " + newUser.name);
    }else{
        newUser.speak();
    }
});
```

Посмотреть что мы насохраняли в базу и вывести записи для конкретной коллекции(модели) можно так:

```javascript
User.find(function (err, users) {
        console.log(users)
    })
```

если нам необходимо добавить условие для выборки, тогда так:

```javascript
User.find({ name: /^Al/ }, function (err, users) {
        console.log(users)
    })
```

// также существует метод findById

Кроме обычных методов схема позволяет добавлять сеттеры и геттеры (магические методы):

```javascript
UserSchema.path("name").set(
    function( name ) {
        //capitalize
        return name.charAt(0).toUpperCase() + name.slice(1);
});

var newUser = new User({ name: "alice"})  //  name will be capitalize
```

Кроме _set_ мы еще можем задать _get_ и _default_ магические методы.

Также схема позволяет на каждый метод повесить триггер с колбэком, который будет выполнен до выполенения самого метода. Такой удобный механизм, который позволяет избежать большой вложенности, в MongoDb называется Middleware.

Реализуется следующим образом:

```javascript
someSchema.pre(methodName,
    function (next, methodArg1, methodArg2, ...) { 
        // ...
    })
```

как пример возмем метод save:

```javascript
UserSchema.pre( "save",
    function( next ) {
        // do stuff
        next();
    } );
```

по `next()` запускается следующий триггер.

Используя данный подход мы можем организовать механизм вызова и передачи ошибок:

```javascript
UserSchema.pre('save',
         function (next) {
             // something goes wrong
             next(new Error('something went wrong'));
});

// later...
newUser.save(function (err) {
    // err can come from a middleware
});
```

Также с помощью Middleware можно делать:

- сложную валидацию
- удаление документов по зависимостям
- вызов кастомизированых событий
- нотификейшены

\*Вероятно статья будет дополнена псевдоджоинами и parallel middleware
