---
title: "View encapsulation и другие опции компилятора"
tags: "Angular,angular-compiler,Uncategorized"
date: "2017-07-28"
---

Это крайне не рекомендовано, но, тем не менее, иногда приходится глобально выключать инкапсуляцию стилей. Чтобы этого достичь мы можем воспользоваться настройками при бутстрапе модуля, то есть вместо:

platformBrowserDynamic().bootstrapModule(AppModule);

сделать:

https://gist.github.com/stevermeister/68c678b749a077cb2fe97514de2ef6da

Полный список параметров компиляции, которые мы можем менять при инициализации модуля:

- **useDebug** - включение дебаг режима (и уже деприкейтед начиная с v4)
- **useJit** - переключатель режима: **Codegen** и **Interpretative** (не путать с AOT/JIT), по умолчанию работает кодогенерация.
- **defaultEncapsulation** - задает инкапсуляцию стилей по умолчанию (то что мы сделали выше)
- **providers** - переопределение провайдеров для компилятора **[COMPILER\_PROVIDERS](https://github.com/angular/angular/blob/4.3.x/packages/compiler/src/jit/compiler_factory.ts#L48-L97)** (вы не можете сделать тоже самое в ngModule, так как компилятор использует **[свой собственный инжектор](https://github.com/angular/angular/blob/4.3.x/packages/compiler/src/jit/compiler_factory.ts#L115)**)
- **missingTranlsations** - задает стратегию поведения при отсутсвующих переводах
- **enableLegacyTemplate** - чтобы продолжать поддерживать тег **template**
