---
title: "Rxjs: 6 операторов, которые вы должны знать"
tags: "RxJs,Хочу сделать мир лучше"
date: "2017-03-28"
---

Перевод поста [RxJS — Six Operators That you Must Know](https://netbasal.com/rxjs-six-operators-that-you-must-know-5ed3b6e238a0#.6c599ctsl).

## 1\. Concat

https://gist.github.com/stevermeister/633ed30d486a22234a97e4fe2a1f7247

![](images/1-aQ_6079QZclqyzdyGRe9cQ.gif)

удобно, когда важен порядок вывода последовательностей.

## 2. forkJoin

\- аналог **Promise.all()**

https://gist.github.com/stevermeister/ebfabc8b15aacd8ad2aaae9b2a92b98d

![](images/1-3GfSzQY-D4LJ1Qbemjfzzg.gif)

## 3\. mergeMap

https://gist.github.com/stevermeister/4e4535c72b00894a3783935757b833ca

\- применяется, когда у вас есть **Observable**, элементы последовательности которого тоже **Observable**, а вам хочется объединить все в один поток (чтобы все элементы внутренние Observable порождали событие основного). Не путать со **switchMap**!

![](images/1-kHit0W9nFk2U3-sA7Y936g.gif)

 

## 4. pairwise

\- возвращает не только текущее значение, но в месте с ним и предыдущее значение последовательности

https://gist.github.com/stevermeister/8367fef7781ec73c7b74ad641846266f

![](images/1-rBxLNG7G_IaXPN_RqBjh6g.gif)

## 5. switchMap

https://gist.github.com/stevermeister/8f30656f748a4559a19948ded09be712

**switchMap** делает **complete** для предыдущего **Observable**, то есть в данном случае у нас всегда будет только один активный Observable для интервала:

![](images/1-9JBxpAbdJtcvxZ7DT9t54A.gif)

а вот **mergeMap** нам бы на каждый клик порождал новую **interval** последовательность.

## 6. combineLatest

\- получить последние значения из каждой последовательности при эммите одного из них:

https://gist.github.com/stevermeister/d70d06abd6ff2bb934aed6f7035d0820

![](images/1-vTgRTk8kjyw68kbOS7GByg.gif)
