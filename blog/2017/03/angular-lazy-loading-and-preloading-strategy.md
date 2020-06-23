---
title: "Angular: Lazy Loading and Preloading strategy"
tags: "Angular,angular-router,lazy-loading,preloading-strategy,Хочу сделать мир лучше"
date: "2017-03-05"
---

Almost all of you know that it's possible in **Angular** to load modules asynchronously by using **Lazy Loading** Router feature, you just need to specify special parameter for the state - **loadChildren**:

\[javascript\] { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' } \[/javascript\]

and setup child module with **RouterModule.forChild** method:

\[javascript\] const routes: Routes = \[ { path: '', component: AdminComponent } \]; @NgModule({ imports: \[ CommonModule, RouterModule.forChild(routes) \], declarations: \[AdminComponent\] }) export class LazyModule { } \[/javascript\]

In most cases you are doing so not to load all the modules at once make "first screen" appearing quicker. But it's not all folks, you also could preload all your lazy modules when your application base is loaded so: you are showing first screen fast and after load other modules in background to show them immediately when it's needed. And it's really usy to setup: for you main RouterModule you add the property **preloadingStrategy**:

\[javascript\] imports: \[ CommonModule, RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }), ... \],

\[/javascript\]

But even more interesting that you could create your own strategy for loading logic. For example you want to start loading the rest of the modules in 5s after app is loaded:

\[javascript\] export class CustomPreloadingStrategy implements PreloadingStrategy { preload(route: Route, fn: () => Observable<boolean>): Observable<boolean> { return Observable.of(true).delay(5000).flatMap( (\_: boolean)=> fn()); } } \[/javascript\]

and you can also specify which routes should not be preloaded:

\[javascript\] export class CustomPreloadingStrategy implements PreloadingStrategy {

public preload(route: Route, fn: () => Observable<boolean>): Observable<boolean> { if (route.data && route.data\['nopreload'\]) { return Observable.of(false); }

return Observable.of(true).delay(5000).flatMap((\_: boolean) => fn()); } } \[/javascript\]
