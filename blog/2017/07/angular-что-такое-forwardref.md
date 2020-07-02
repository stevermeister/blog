---
title: "Angular: Что такое forwardRef?"
tags: "Angular,angular-forwardRef"
date: "2017-07-15"
---

Мы иногда встречаем в коде:

```typescript
export const MY_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MyComponent),
  multi: true
};
```

и сразу не понятно, что это магическая функция **forwardRef**. На самом деле все просто: [**forwardRef**](https://angular.io/api/core/forwardRef) - это функция-обертка. Зачем она нужна? Чтобы мы могли задавать значением свойства сущности, которые объявлены ниже (иначе будет ошибка):

```typescript
export const My_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MyComponent),
  multi: true
};

export class MyComponent {
 //...
}
```

Также можно глянуть в [исходники](https://github.com/angular/angular/blob/master/packages/core/src/di/forward_ref.ts#L36), и убедиться что это просто метод-обертка:

```typescript
export function forwardRef(forwardRefFn: ForwardRefFn): Type<any> {
  (<any>forwardRefFn).__forward_ref__ = forwardRef;
  (<any>forwardRefFn).toString = function() { return stringify(this()); };
  return (<Type<any>><any>forwardRefFn);
}
```
