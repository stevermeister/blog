---
title: "ui-router debug snippet"
tags: "AngularJs,debug,ui-router,Хочу сделать мир лучше"
date: "2015-04-13"
---

found nice code snippet that could help you to debug ui-router issues by loggin router events in console:

\[javascript\] // Credits: Adam\`s answer in https://stackoverflow.com/a/20786262/69362 var $rootScope = angular.element(document.querySelectorAll('\[ui-view\]')\[0\]).injector().get('$rootScope');

$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){ console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \\n',toState, toParams); });

$rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){ console.log('$stateChangeError - fired when an error occurs during transition.'); console.log(arguments); });

$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){ console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.'); });

$rootScope.$on('$viewContentLoaded',function(event){ console.log('$viewContentLoaded - fired after dom rendered',event); });

$rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){ console.log('$stateNotFound '+unfoundState.to+' - fired when a state cannot be found by its name.'); console.log(unfoundState, fromState, fromParams); }); \[/javascript\]

if you have you Angular app root on html element you can simply use:

\[javascript\] var $rootScope = angular.element(document).scope(); \[/javascript\]

code is placed [here](https://gist.github.com/stevermeister/aab6dcceff81b1449855 "gist").
