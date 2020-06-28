---
title: "AngularJS: отличие scope.$apply() от scope.$digest()"
tags: "AngularJs,javascript,Хочу сделать мир лучше"
date: "2014-07-06"
---

Часто слышу этот вопрос. Вроде бы и [документация](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$apply "docs.angularjs.org") стала лучше, и столько уже [обсуждений](https://stackoverflow.com/questions/18697745/apply-vs-digest-in-directive-testing "stackoverflow.com") по этому поводу есть. Но всеравно у многих этот вопрос остается открытым.

Если глянуть в исходники ведь все становится ясно:

[javascript] $apply: function(expr) { try { beginPhase('$apply'); return this.$eval(expr); } catch (e) { $exceptionHandler(e); } finally { clearPhase(); try { $rootScope.$digest(); } catch (e) { $exceptionHandler(e); throw e; } } }, [/javascript]

**scope.$apply()** просто оболочка на **$rootScope.$digest()** плюс отлов исключений и выполнение **expr** параметра.

**Итого**: если нам нужно обновить наблюдателей(**watchers**) в каком-то конкретном **scope** и нам не важна обработка исключительных ситуаций - например в тестах - можем смело делать **scope.$digest()**.
