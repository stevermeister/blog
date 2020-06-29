---
title: "AngularJS: from 1.2 to 1.4 hints"
tags: "AngularJs,migration"
date: "2015-10-20"
---

Just a checklist to prevent issues with application migration.

## Expressions

- no .bind, .call and .apply
- no __proto__
- no Object

## toBoolean

fixed strange behaviour (from 1.3): before _'f'_, _'0'_, _'false'_, _'no'_, _'n'_, _'[]' _ have been converted to **false**. Check you **ng-if** statements.

## helpers

**.copy()** - makes a copy of only own properties (from **1.3**)

**.forEach()** - does not take in account new elements (if during the loop size was changed)(from **1.3**)

## other

directive property **replace** - is now deprecated (from **1.3**)

**responseInterceptors** property was removed from **$httpProvider** (from **1.3**) - now it's just **$httpProvider.interceptors**

**$cookieStore** is deprecated from **1.4** ( you should use $cookie instead)

If you know more tricky places - do not hesitate to share!
