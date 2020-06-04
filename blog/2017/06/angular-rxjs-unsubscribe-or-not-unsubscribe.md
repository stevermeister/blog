---
title: "Angular & Rxjs: Отписываться или не отписываться?"
tags: "Angular,RxJs,RxJS.takeUntil,Хочу сделать мир лучше"
date: "2017-06-03"
---

Как вы наверное уже знаете при подписке на обозреваемую последовательность либо просто событие в Javascript вы обычно должны в определенный момент отписываться, чтобы освободить память. Иначе это приведет к утечке памяти.

Мы рассмотрим основные случаи, когда вы должны отписываться в **ngOnDestroy** хуке компонента, а также случаи, когда можно не отписываться.

## Нужно отписываться

**Формы**

необходимо отписываться от формы и от отдельных формконтролов, на которые подписались:

https://gist.github.com/stevermeister/b0729635a19a20ab8c3ae1731a056cbb

**Роутер**

Согласно официальной документации **Angular** должен сам отписывать вас, [но этого не происходит](https://github.com/angular/angular/issues/16261), поэтому:

https://gist.github.com/stevermeister/ee9fdca12fd3895a1c9d19e8eb2c8de3

**Рендерер**

https://gist.github.com/stevermeister/ef76fa152c4b601166f008218bbd9409

**Бесконечные обозреваемые последовательности**

Примерами бесконечных могут служить последовательности созданные с помощью **interva()** или слушающие события (**fromEvent()**):

https://gist.github.com/stevermeister/e38d65c1487f371e509b5da1d0be8ee9

**ngRx**

От подписок на состояние **Store ngRx** тоже необходимо отписываться:

https://gist.github.com/stevermeister/a1ec1b4b6ba2e2e17d92872030ff31b3

 

## Отписываться НЕ нужно

**Async pipe**

C async pipe нам повезло и он выполнят работу под отписке за нас:

https://gist.github.com/stevermeister/c87db9bca26a8a5609e01658a7e9b9c3

**@HostListener**

так же нам не нужно отписываться, когда мы навешиваем слушатель события с помощью HostListener:

https://gist.github.com/stevermeister/fa9aafd4a3351f8a5ce4ceedcd40122c

**Конечные обозреваемые последовательности**

Бывают последовательности, которые сами завершаются, такие как **HTTP** и **timer**:

https://gist.github.com/stevermeister/f28edc7bb3ee905618edeb74ae2cc005

## Bonus

Также вы можете использовать оператор **[takeUntil](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/takeuntil.md)**, который позволит писать код в декларативном стиле, не отписываясь от каждого обозревателя отдельно:

https://gist.github.com/stevermeister/431d4e5e786a39d2a2cf46c1b2ab1d42

Кроме **takeUntil** вы еще можете использовать [take](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/take.md), [takeWhile](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/takewhile.md) и [first](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/first.md) которые также позволят "убить" последовательность, соотвественно не прийдется от нее отписываться.

 

Большая часть материала взята из статьи [When to Unsubscribe in Angular](https://netbasal.com/when-to-unsubscribe-in-angular-d61c6b21bad3).
