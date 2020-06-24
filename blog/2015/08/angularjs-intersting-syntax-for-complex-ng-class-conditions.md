---
title: "AngularJs: intersting syntax for complex ng-class conditions"
tags: "AngularJs,ng-class,Хочу сделать мир лучше"
date: "2015-08-26"
---

Just now I got known quite interesting condition syntax for [ng-class](https://docs.angularjs.org/api/ng/directive/ngClass) (from [stackoverflow answer](https://stackoverflow.com/a/8309832/274500)):

\[javascript gutter="0"\] ng-class="{admin:'enabled', moderator:'disabled', '':'hidden'}\[user.role\]" \[/javascript\]

it seems that there is not good explanation for such case in documentation. being inspired by this possibility I decided to create even more complex condition: \[javascript gutter="0"\] ng-class="connections.length && ({true:'open', false:'close'}\[!!manager.showConnections\])" \[/javascript\]

(_flag open/close will be shown only if there are some connections for current manager_)
