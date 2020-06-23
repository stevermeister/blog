---
title: "Angular: Меняем title в зависимости от стейта"
tags: "Angular,angular-router,Хочу сделать мир лучше"
date: "2017-03-25"
---

Для того чтобы сделать динамический title в Angular (2+) нам не нужно придумывать свои велосипеды как это было в AngularJs. Достаточно просто использовать сервис **[Title](https://angular.io/docs/ts/latest/api/platform-browser/index/Title-class.html)**, у которого есть методы **getTitle** и **setTitle**.

То есть если вы просто хотите задать тайтл достаточно сделать:

\[javascript\] export class AppComponent implements OnInit { constructor(private titleService: Title) {} ngOnInit() { this.titleService.setTitle('My Page Title'); } } \[/javascript\]

При этом Title подключается из модуля **@angular/platform-browser**:

\[javascript\] import { Title } from '@angular/platform-browser'; \[/javascript\]

Тут вроде как все понятно, но что, если мы захотим динамически менять тайтл в зависимости от стейта/странички на которой находимся?

Todd Motto предлагает [следующее решение](https://toddmotto.com/dynamic-page-titles-angular-2-router-events). Внимание! В представленном ниже примере поправлены имена некоторых переменных по сравнению с оригиналом. Сначала мы прописывем значение title для всех стейтов в конфигурации роутера:

\[javascript\] const routes: Routes = \[{ path: 'calendar', component: CalendarComponent, children: \[ { path: '', redirectTo: 'new', pathMatch: 'full' }, { path: 'all', component: CalendarListComponent, data: { title: 'My Calendar' } }, { path: 'new', component: CalendarEventComponent, data: { title: 'New Calendar Entry' } }, { path: ':id', component: CalendarEventComponent, data: { title: 'Calendar Entry' } } \] }\]; \[/javascript\]

а потом получаем по событию [NavigationEnd](https://angular.io/docs/ts/latest/api/router/index/NavigationEnd-class.html):

\[javascript\] export class AppComponent implements OnInit { constructor( private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title ) {} ngOnInit() { //смотрим на все события роутера this.router.events //фильтруем по событию NavigationEnd .filter(event => event instanceof NavigationEnd) //переключаем поток на сервис activatedRoute .map(() => this.activatedRoute) //нас интересуют только корневые роуты (это опционально) .map(route => { while (route.firstChild) route = route.firstChild; return route; }) // так же мы выбираем только первичные аутлеты (тоже опционально) .filter(route => route.outlet === 'primary') // выбираем title .mergeMap(route => route.data.title) //задаем .subscribe(stateTitle => this.titleService.setTitle(stateTitle); } \[/javascript\]
