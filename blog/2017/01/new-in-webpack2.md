---
title: "Что нового в webpack2"
tags: "webpack,webpack2"
date: "2017-01-15"
---

![](images/Screen-Shot-2017-01-14-at-19.58.07.png)

- понимание **ES6 модулей** из коробки (без конвертации в CommonJS)
- поддержка **Tree Shaking**
- конфиг теперь может быть **функцией с параметрами** и возвращать **промис**
- **uglifyjs** плагин не включает автоматом минификацию других плагинов
- опциии для лодеров задаются непосредственно в конфигурации лодера, для поддержки старых плагинов добавили **LoaderOptionsPlugin**, который задает опции в контекте всего вебпака
- **Promise** полифил теперь не включен в сборку по умолчанию
- большая часть плагинов теперь принимает **параметром объект опций**, вместо набора параметров
- добавлен алиас **webpackfile.js**
- флаг "**_p**" устанавливает NODE_ENV = “**production**”
- **debug** теперь включается для каждого лодера отдельно (нет глобальной опции)
- имена свойств конфига: вместо module.loaders теперь пишем **module.rules**, более чистая нотация с перечислением лодеров в объекте свойства **use**

[Инструкции по миграции](https://webpack.js.org/guides/migrating/).
