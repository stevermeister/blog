---
title: "AngularJs: альтернативный синтаксис регистрации директив"
tags: "AngularJs,controller,directive,javascript,Хочу сделать мир лучше"
date: "2014-02-16"
---

Вместо привычного нам:

app.directive('directiveName', function() { ...

можно использовать групповой синтаксис:

app.directive(directives)

где **directives** - объект содержащий в себе директивы (ключ - название директивы, значение - функция конструктор).

Может быть удобно для использования пространства имен (namespaces):

User.directives = {};
User.directives.myDirective = function () { ...
angular.directive(User.directives);

данный синтаксис работает также и для контроллеров.
