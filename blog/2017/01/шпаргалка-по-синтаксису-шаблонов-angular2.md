---
title: "Шпаргалка по синтаксису шаблонов Angular2"
tags: "Angular2,cheatsheet,templates"
date: "2017-01-07"
---

взято с [официальной документации](https://angular.io/docs/ts/latest/guide/cheatsheet.html), переведено/переработано.

<input **[value]**\="firstName">

задание свойства **value**

<div **[attr.role]**\="myAriaRole">

задание атрибута **role**.

<div **[class.extra-sparkle]**\="isDelightful">

Выставляет класс **extra-sparkle** по условию **isDelightful**

<div **[style.width.px]**\="mySize">

задает значение **width** в пикселях.

<button **(click)**\="readRainbow($event)">

Привязывает обраобтчик клика **readRainbow**

<p>Hello **{{ponyName}}**</p> <div title="Hello **{{ponyName}}**">

Подставляет значение выражения

<my-cmp **[(title)]**\="name">

Двойное связывание, альтернатива: <my-cmp [title]="name" (titleChange)="name=$event">

<video **#movieplayer** ...> <button **(click)**\="movieplayer.play()"> </video>

Создает локальную переменную **movieplayer**, которая является ссылкой на элемент **video**

<p **\*myUnless**\="myExpression">...</p>

Символ **\*** превращает текущий элмент во втроенный шаблон: :<template [myUnless]="myExpression"><p>...</p></template>

<p>Card No.: **{{cardNumber | myCardNumberFormatter}}**</p>

Применение **myCardNumberFormatter** пайпа.

<p>Employer: **{{employer?.companyName}}**</p>

Указание не обязательного поля с помощью оператора "**?**"
