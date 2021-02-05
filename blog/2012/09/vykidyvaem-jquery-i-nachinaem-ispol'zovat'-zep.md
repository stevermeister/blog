---
title: "Выкидываем jQuery и начинаем использовать Zepto.js"
tags: "javascript,jQuery,Uncategorized,Zepto.js"
date: "2012-09-14"
slug: "выкидываем-jquery-и-начинаем-использовать-zep"
---

![](images/logo-300x71.png "logo")

Недавно открыл для себя библиотеку [Zepto.js](https://zeptojs.com/ "zeptojs of-site"), которая оказалась оптимизированной версией jQuery. Ключевой момент оптимизации - отказ от мега-кроссбраузерности, т.е. разработчики сосредоточились только на движке WebKit. И правда, если у вас нет необходимости поддерживать ИЕ, то зачем использовать jQuery?

Платформы, которые поддерживает текущая версия(1.0rc1):

- Safari 5+ (desktop)
- Chrome 5+ (desktop)
- Mozilla Firefox 4+
- iOS 4+ Safari
- Android 2.2+ Browser
- Other WebKit-based browsers/runtimes
- webOS 1.4.5+ Browser
- BlackBerry Tablet OS 1.0.7+ Browser
- Amazon Silk 1.0+
- Opera 10+

Причем для IE мы всегда сможем подключить jQuery. На сайте это советуют сделать так:

```html
<script>
document.write('<script src=' + ('__proto__' in {} ? 'zepto' : 'jquery') + '.js><\\/script>')
</script>
```

[jQuery CSS селекторы](https://api.jquery.com/category/selectors/jquery-selector-extensions/) правда не поддерживаются, но поддерживается некоторые самые популярные для совместимости.

При использовании следует быть аккуратным с animate, т.к. там есть мелкие расхождения, а так все тоже. Если опыт показал еще какие-то глюки - пишите.

**UPD**: провел сравнительные тест - ладно, выкидываем Zepto, а новый jQuery(1.8.1) достаточно хорош, особенно в плане создания новых элементов.

Ссылка на тест: https://jsfiddle.net/STEVER/w2Jmn/
