---
title: "Angular2: Possible parameters for @HostBinding and @HostListener decorators"
tags: "Angular2,HostBinding,HostListener,Хочу сделать мир лучше"
date: "2017-01-14"
---

## @HostBinding(?)

- **propertyName**: references a property of the host with the **propertyName** name.
- **attr.attributeName**: references an attribute of the host with the **attributeName** name. The initial value is set to the associated directive property. Setting a value in the property updates the attribute on the corresponding HTML element. Using the null value at this level removes the attribute on the HTML element.
- **style.styleName**: links a directive property to a style of the HTML element.
- **class.className**: links a directive property to a class name of the HTML element. If the value is true, the class is added otherwise removed.

## @HostListener(?)

- **eventName**: the name of the event to register a method callback on.

Example for all the cases:

\[javascript\] @Directive({ selector: 'mydir' }) export class SomeDirective { @HostBinding('value') value:string; @HostBinding('attr.role') role:string; @HostBinding('style.width.px') width:number; @HostBinding('class.someClass') condition:boolean; @HostListener('input') onInput() { console.log('on input in directive'); } } \[/javascript\]
