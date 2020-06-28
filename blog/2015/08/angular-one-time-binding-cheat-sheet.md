---
title: "Angular one-time binding cheat sheet"
tags: "AngularJs,cheatsheet,javascript,Хочу сделать мир лучше"
date: "2015-08-06"
---

**ng-bind**:

[javascript gutter="0"] {{ ::user.name }} [/javascript]

with filters

[javascript gutter="0"] {{ ::item.price|number }} [/javascript]

**ng-class**:

[javascript gutter="0"] <div ng-class="::{ 'active': item.active }"></div> [/javascript]

**ng-if**:

[javascript gutter="0"] <div ng-if="::user.isOnline"></div> [/javascript]

with several conditions:

[javascript gutter="0"] <div ng-if="::(user.isOnline && users.length)"></div> [/javascript]

**ng-repeat**:

[javascript gutter="0"] <div ng-repeat="item in ::user.items"></div> [/javascript]

**ng-options**:

[javascript gutter="0"] <select ng-options="n.title for n in ::list"></select> [/javascript]

**directive attributes**:

[javascript gutter="0"] <user-card user="::currentUser"></user-card> [/javascript] it will work even if you have two-way binging inside your directive
