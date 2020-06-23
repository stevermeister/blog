---
title: "ui-router: Deprecated events and hooks"
tags: "AngularJs,javascript,ui-router,Хочу сделать мир лучше"
date: "2016-07-28"
---

If you are using latest version of [ui-router](https://github.com/angular-ui/ui-router) (now it's **1.0.0-alpha**) you probably already noticed that there are no events that we all got used to: **$stateChangeCancel**,  **$stateChangeError**, **$stateChangeStart**, **$stateChangeSuccess**, **$stateNotFound**. All of them are deprecated in 1.0.0-alpha.3 and you can not use them anymore in 1.0.0-alpha.5.

If you want to move to new version of ui-router you should make such changes:

## $stateChangeCancel

It was an event that was thrown [when somebody called "event.preventDefault()"](https://github.com/angular-ui/ui-router/commit/ecefb75). Now everything is controlled by transitions so no chance to get such event.

## $stateChangeError

old code

\[javascript\] $rootScope.$on('$stateChangeError', function(event, toState) { //some code to handle the error }) \[/javascript\]

new code

\[javascript\] $transitions.onError({ to: 'stateName' }, function($error$) { console.log($error$); } \[/javascript\]

in progress

## $stateChangeStart

old code

\[javascript\] $rootScope.$on('$stateChangeStart', function(event, toState) { event.preventDefault(); }) \[/javascript\]

new code

\[javascript\] $transitions.onEnter({ to: 'stateName' }, function($state$, $transition$) { return $q.reject() } \[/javascript\]

## $stateChangeSuccess

old code

\[javascript\] $rootScope.$on('$stateChangeSuccess', function(event) {}) \[/javascript\]

new code

\[javascript\] $transitions.onSuccess({}, () => {}); \[/javascript\]

## $stateNotFound

old code

\[javascript\] $rootScope.$on('$stateNotFound', function(event) {}) \[/javascript\]

new code

\[javascript\] $stateProvider.onInvalid(($to$, $from$) => {}) \[/javascript\]

 

[Sandbox](http://plnkr.co/edit/ahs15IQI866ZwrvxvIMe?p=preview) to play with all examples.
