---
title: "Angular2: Changing default component properties."
tags: "Angular2,angular2-component,angular2-decorators,Хочу сделать мир лучше"
date: "2017-01-28"
---

_**Attention!** Please keep in mind that this post is not manual, it's research that helps you to understand Angular better and don't try to apply code examples in your enterprise applications._

If you look into all the angular exports you could find specific super private(double low dash) property \_\_core\_private\_\_ :

\[javascript\]import { \_\_core\_private\_\_ } from '@angular/core';\[/javascript\]

it provides us access to a method makeDecorator that is kind of internal factory to make all the decorators, so to create new decorator you just need to do:

\[javascript\]\_\_core\_private\_\_.makeDecorator('myNewDecorator', {});\[/javascript\]

so if you wanna create your own Component decorator it's just:

\[javascript\]const MyComponent = \_\_core\_private\_\_.makeDecorator('MyComponent', {});\[/javascript\]

there is also 3rd parameter that allows us to make **inheritance** from another decorator, so let's use existing **Component decorator**:

\[javascript\] const MyComponent = \_\_core\_private\_\_.makeDecorator('MyComponent', {}, Component); \[/javascript\]

we need to set required properties(it will not work without them):

\[javascript\] const MyComponent = \_\_core\_private\_\_.makeDecorator('myComponent',{ selector: undefined, template: '', styleUrls: undefined},Component)) \[/javascript\]

and you could also extend some extra, for example **switch off encapsulation**:

\[javascript\] const MyComponent = \_\_core\_private\_\_.makeDecorator('myComponent',{ selector: undefined, template: '', styleUrls: undefined encapsulation: ViewEncapsulation.None },Component)) \[/javascript\]

All code for module(mycomponent.ts):

\[javascript\] import {\_\_core\_private\_\_, Component, ViewEncapsulation} from '@angular/core';

let MyComponent = \_\_core\_private\_\_.makeDecorator('myComponent', { selector: undefined, template: '', styleUrls: undefined, encapsulation: ViewEncapsulation.None}, Component);

export {MyComponent as Component} \[/javascript\]

that can be use instead of core Component:

\[javascript\] import {Component} from './mycomponent'; \[/javascript\]
