---
title: "Angular: OpaqueToken или InjectionToken"
tags: "Angular,injection-token,opaque-token,Хочу сделать мир лучше"
date: "2017-03-19"
---

Не успели все познакомиться с понятием **[OpaqueToken](https://stepansuvorov.com/blog/2017/01/angular2-opaque-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D1%8B-%D0%B8-%D0%BC%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BF%D1%80%D0%BE%D0%B2%D0%B0%D0%B9%D0%B4%D0%B5%D1%80%D1%8B/)**, как оно уже становиться deprecated. Теперь нужно использовать вместо него **InjectionToken**.

Давайте попробуем разобраться почему.

При том, что **InjectionToken** несет такую же функциональность что и **OpaqueToken**(более того он является наследником), он еще предоставляет возможность строго задать тип инжектируемой сущности. Особенно это удобно, когда это сложный/составной тип с внутренними свойствами.

Особенно это удобно, когда вы работаете с инжектором напрямую (что довольно часто внутри самого фреймворка).

Давайте разберем пример с конфигурацией приложения, которая задается через инжектируемую сущность как значение. Для начала определим интерфейс для этого типа:

\[javascript\] interface Config { production: boolean; base: string; } \[/javascript\]

Теперь можем создать для нашей инжектируемой сущности InjectionToken и по нему задать провайдер:

\[javascript\] const APP\_CONFIG = new InjectionToken<Config>('APP\_CONFIG'); providers: \[ { provide: APP\_CONFIG, useValue: { production: true, base: '' } } \] \[/javascript\]

При инжектировании нашей сущности с помощью инжектора:

\[javascript\] constructor(injector: Injector) { const config = injector.get(APP\_CONFIG); } \[/javascript\]

компилятор уже знает какого типа будет config, поэтому если мы попробуем написать что-то типа:

\[javascript\] this.base = config.bese; //просто опечатались \[/javascript\]

компилятор сразу выдаест ошибку: _Property 'bese' does not exist on type 'Config'_ А в случае использования OpaqueToken ошибка не будет выявлена на этапе компиляции. Довольно удобно, правда?
