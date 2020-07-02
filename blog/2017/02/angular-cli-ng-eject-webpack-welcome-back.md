---
title: "angular-cli + `ng eject` => webpack welcome back"
tags: "Angular,ng,Рекомендую"
date: "2017-02-22"
---

Наконец-то(начиная с [1.0.0-beta.32](https://github.com/angular/angular-cli/blob/master/CHANGELOG.md#100-beta32-2017-02-17)) разработчики **angular-cli** дали доступ к более тонким настройкам **webpack** и теперь не нужно выбирать между двумя инструментами. Выполнив команду:

[shell] ng eject [/shell]

у вас появится файл вебпак конфига в корне проекта, и теперь вместо команды **ng** вы запускаете старую добрую **npm**:

[shell] ng serve -> npm start ng build -> npm run build ... [/shell]

 

P.S.: Уже наткнулся на проблему с поломанной подстановкой environment файла ([issue](https://github.com/angular/angular-cli/issues/4907)).
