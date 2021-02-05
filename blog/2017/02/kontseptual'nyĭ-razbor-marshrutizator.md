---
title: "Концептуальный разбор маршрутизатора Angular2 с примерами"
tags: "Angular,angular-router"
date: "2017-02-18"
slug: "концептуальный-разбор-маршрутизатор"
---

- подключение и базовая настройка
    - use hash
- стейты (states)
- специальные директивы роутера
- параметры стейта
- параметры запроса(query params)
- статические параметры стейта
- перенаправление на другой стейт
- события (events)
- хуки (guards)
- резолв асинхронных данных
- вложенные стейты (nested states)
- множественные вью (multiple views)
- ленивая загрузка (lazy loading)

## Подключение и базовая настройка

Для использования маршрутизатора нам необходимо в первую очередь импортировать его модуль:

import { RouterModule } from '@angular/router'

и прописать в зависимостях:

```typescript 
imports: [

RouterModule,

], 
```

После чего мы можем настроить состояния(стейты). Добавим корневой стейт:

```typescript 
const routes = [ {path: '', component: HomeComponent}, ]; 
```

синтаксис, как вы видите, довольно простой. Нам достаточно указать путь и компонент, который будет отображаться по этому пути. Можем таким же способом добавить еще один стейт:

```typescript 
const routes = [ {path: '', component: HomeComponent}, { path: 'user', component: UsersComponent}, ]; 
```

Теперь, чтобы подключить описание стейтов к модулю роутера сделаем:

```typescript 
imports: [

RouterModule.forRoot(routes),

], 
```

По умолчанию используются HTML5 пути, но если мы хотим переключить на хеш, то нам нужно указать дополнительный параметр:

```typescript 
imports: [

RouterModule.forRoot(routes, {useHash: true}),

], 
```

## Специальные директивы роутера

[RouterOutlet](https://angular.io/docs/ts/latest/api/router/index/RouterOutlet-directive.html) - для задание места вывода представления:

```html
<router-outlet></router-outlet>
```

[RouterLink](https://angular.io/docs/ts/latest/api/router/index/RouterLink-directive.html) - хелпер для удобного вывода ссылки:

```html
<a routerLink="user">User</a>
```

[RouterLinkActive](https://angular.io/docs/ts/latest/api/router/index/RouterLinkActive-directive.html) - для выделения(задания специального css класса) активных(указывающих на текущий стейт) ссылок:

```html
<a routerLink="user" routerLinkActive="active-class">User</a>
```

также можно задавать параметр

```
[routerLinkActiveOptions]="{exact: true}"
```

## Параметры стейта

Определяем параметр в настройках стейта:

```typescript 
{ path: 'user/:userId', component: UsersComponent}, 
```

Получаем этот параметр с помощью специального сервиса **ActivatedRoute**:

```typescript 
constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe(params => console.log(params.userId)); 
} 
```

также можно подписаться на конкретный параметр с помощью метода [pluck](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/pluck.md):

```typescript 
constructor(private route: ActivatedRoute) { 
    this.route.params.pluck('userId').subscribe(userId => console.log(userId)); 
} 
```

## Параметры запроса(query params)

Кроме параметров стейта, можем также добавлять в url произвольное количество параметров запроса:

```html
<a routerLink="search" [queryParams]="{ city: 'Amsterdam' }">Filter by Amsterdam</a>
```

либо если изменяем стейт с помощью метода navigate:

```typescript 
this.router.navigate(['/search'], { queryParams: { city:'Amsterdam' } }); 
```

Чтобы получить параметры стейта подписываемся на queryParams свойство:

```typescript 
constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => console.log(params.city)); 
} 
```

## Cтатические параметры стейта

Стейт также можно дополнять статическими параметрами:

```typescript 
{ 
    path: 'user', 
    component: UsersComponent, 
    data: {userName: 'John'}
}, 
```

И получить доступ через сервис **ActivatedRoute**:

```typescript 
constructor(private route: ActivatedRoute) { 
    this.route.data.subscribe(console.log); 
} 
```

## Перенаправление на другой стейт

Перенаправление может быть либо **автоматическим** (постоянный редирект) либо **условным** (по какому-то действию).

Чтобы сделать автоматический редирект в настройках стейта мы прописываем свойство **redirectTo**, где указываем стейт, на который хотим перенаправить:

```typescript 
const routes = [ 
    { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
    }, 
    { 
        path: 'dashboard', 
        component: DashboardComponent 
    }, 
]; 
```

обратите также внимание, что в случае **path: ''** мы должны указать строгую стратегию разбора URL - **pathMatch: 'full'**.

Для условного перенаправления мы используем методы **router.navigate()** и **router.navigateByUrl()**:

```typescript 
router.navigate(['users', userId]); 
router.navigateByUrl(`users/${userId}`); 
```

_ отличие только в том, что в первом случае вы подаете как параметр набор команд, а во втором строку URL.

## Cобытия роутера

Мы можем подписываться не только на данные, но и на события происходящие в роутере, в этом нам поможет сервис **Router**:

```typescript 
constructor(router: Router) { 
    router.events.subscribe((event: Event) => { 
        if (event instanceof NavigationStart) { //... 
        } 
    }); 
} 
```

кроме события **NavigationStart** мы также можем слушать:

- **NavigationEnd**
- **NavigationCancel**
- **NavigationError**
- **RoutesRecognized**

## Хуки (guards)

На ряду с событиями в роутере есть **хуки**(**guards**), которые в отличие от событий выполняются **ДО** действия и в данном случае мы можем вклиниться в поток выполнения, и если нужно остановить выполнение события.

Существуют следующие хуки:

- **CanActivate** - определяет возможность загрузки стейта
    
- **CanActivateChild** - аналогично предыдущего только для вложенного стейта
    
- **CanDeactivate** - запускается при смене стейта, хорошим примером будет подтверждение не сохраненных данных перед уходом со страницы:
    
```typescript
CanDeactivate(){
        return window.confirm("You have unsaved changes. Still want to leave?");
}
```
    
- **CanLoad** - определяет может ли стейт быть загружен асинхронно
    
- **Resolve** - для резолвинга данных до загрузки стейта (см. отдельный пункт о резолвинге данных)
    

Для реализации хука нам нужно 2 момента: определить его в стейте:

```typescript 
{ 
    path: 'user', 
    component: UsersComponent, 
    canActivate: AuthService
}, 
```

и создать сам хук-сервис, который будет реализовывать соотвествующий интерфейс:

```typescript 
import {CanActivate} from '@angular/router'; 
export class AuthService implements CanActivate{ 
    canActivate(): boolean { 
        return true; 
    } 
} 
```

В методе **canActivate** мы можем возвращать как просто булевое значение, так и асинхронные **Promise** и **Observable**.

## Резолвинг асинхронных данных

Для подгрузки асинхронных данных до загрузки стейта также используется хук - **Resolve**:

```typescript 
{ 
    path: 'user', 
    component: UsersComponent, 
    resolve:{ user: UserDataResolveService }
}, 
```

теперь создадим резолв-сервис:

```typescript 
import { Resolve } from '@angular/router'; 
export class UserDataResolveService implements Resolve<any> { 
    resolve() { 
        return { name: 'Bob' }; 
    } 
}
```

и можно будет подписаться на эти данные, также как и на статические:

```typescript 
constructor(route: ActivatedRoute) { 
    route.data.subscribe(data => { 
        console.log(data.user); 
    }); 
} 
```

## Вложенные стейты (nested states)

Для задание вложенных/дочерних стейтов мы используем свойство children, в котором определяем массив:

```typescript 
{
    path: 'user',
    children: [ 
        {path: '', component: UserProfileComponent}, 
        {path: 'settings', component: UserSettingsComponent} 
        ]
}, 
```

синтаксис вложенных стейтов идентичен основным. Вложенные стейты также могут иметь свои вложенные.

## Множественные вью (multiple views)

Роутер ангуляра поддерживает множественные вью, то есть наличие нескольких именованных **RouterOutlet** компонентов:

```html
<router-outlet></router-outlet> <router-outlet name="popup"></router-outlet>
```

Неименованный - основной. Теперь для настройки прописываем специальное свойство **outlet**:

```typescript 
{ 
    path: 'user', 
    component: HomeComponent 
}, 
{ 
    path: 'user', 
    component: UsersComponent, 
    outlet: 'popup'
}, 
```

Ссылка routerLink будет выглядеть для такого случая следующим образом:

```html
<a [routerLink]="[{ outlets: { primary: 'user', popup: 'user' } }]"></a>
```

а если мы хотим деактивировать второстепенный аутлет:

```html
<a [routerLink]="[{ outlets: { popup: null } }]">Close user</a>
```

## Ленивая загрузка (lazy loading)

Роутер также дает нам возможность организовать отложенную(ленивую) загрузку модулей. Для этого нам необходимо прописать в стейт специальное свойство **loadChildren** и указать в нем путь и имя модуля, который собираемся загрузить:

```typescript 
{ 
    path: 'lazy', 
    loadChildren: './lazy/lazy.module#LazyModule' 
} 
```

и инициализировать **RouterModule** внутри **LazyModule**:

```typescript 
const routes: Routes = [ { path: '', component: AdminComponent } ];

@NgModule({ 
    imports: [ CommonModule, RouterModule.forChild(routes) ], 
    declarations: [AdminComponent] 
}) export class LazyModule { } 
```

мы можем определить сколько захотим состояний для **LazyModule**, но я для простоты определил один, который загрузит компонент **AdminComponent**.
