---
title: "AngularJS: Зачем котроллеру ngModel нужны $formatters и $parsers"
tags: "$formatters,$parsers,AngularJs,ngModel,Хочу сделать мир лучше"
date: "2015-11-04"
---

Небольшая заметка о том, для чего нужны **$formatters** и **$parsers** в контроллере **ngModel** директивы и когда их можно применять.

Вкратце:

- **$formatters** определяют как модель будет представлена во вью
- **$parsers** определяют как значения из вью будет записаны в модель

Сразу же пример кода:

[javascript] //model -> view ngModel.$formatters.push(function(modelValue) { return modelValue.toUpperCase(); });

//view -> model ngModel.$parsers.push(function(viewValue) { return viewValue.toLowerCase(); }); [/javascript]

Полный пример кода [тут](https://plnkr.co/edit/ZmlGQtag494IYuorGsgS?p=preview).

Можете обратить внимание что при попытке задать модели через поле ввода оно всегда будет в нижнем регистре, и наоборот: при выводе значения модели в инпуте оно будет в верхнем регистре.

Кроме форматирования ввода/вывода мы можем использовать парсер-форматеры также для проверки данных:

[javascript] ngModel.$parsers.unshift(function checkForEven(viewValue){ if (parseInt(viewValue)%2 === 0) { ngModel.$setValidity('evenNumber',true); } else{ ngModel.$setValidity('evenNumber', false); } return viewValue; }); [/javascript]

в данном случае мы разрешаем использовать только четные числа.

Если нужно валидировать не только данные вводимые в инпут, но и данные передаваемые во вью из модели, то эту же проверку необходимо добавить и в форматеры. Оба случая можно посмотреть [тут](https://plnkr.co/edit/jwjHL4WWmbHEvHGrXIxG?p=preview).

Мы можем задавать как один парсер/форматер, так и не сколько, и они будут выполнены в порядке, в котором они указаны в массиве, именно поэтому, если вы хотите чтобы валидаторы выполнились первыми мы делаем не **push()**, а **unshift()**.
