---
title: "Полезности для .gitconfig"
tags: ".gitconfig,git,Хочу сделать мир лучше"
date: "2014-02-25"
---

Небольшой набор инструкции по настройке **git** через **.gitconfig**, которые использую сам

Прописываем информацию о себе

Если вы еще этого не сделали, то крайне рекомендую - серьезно повышает читабельность логов:

\[user\]
name = Ivanov Ivan
email = ivan.ivanov@gmail.com

## Алиасы команд

\[alias\]
co = checkout
ci = commit
br = branch
st = status --short
clean = branch -D
hist = log --pretty=format:\\"%h %ad | %s%d \[%an\]\\" --graph --date=short

подбирается индивидуально по предпочтениям и частоте использования полных команд

## Добавляем цветов

\[color\]
ui = true

## Прописываем gitignore глобально

Вместо того, чтобы каждый раз прописывать какие-то файлы настроек, которые создает IDE(например _.idea_ для продуктов JetBrains), в **.gitignore**, можно вынести их один раз в глобальные настройки.

\[core\]
excludesfile = ~/.gitexcludes

## Задаем редактор

Командой (она добавит несколько параметров в конфиг)

$ git config --global core.editor sourcetree

в моем случае это [sourcetree](http://www.sourcetreeapp.com/). Теперь все конфликты и дифы будет обрабатываться в нем.

commit-сообщения по умолчанию

тоже вероятно упростит жизнь для мелких коммитов и коммитов, которые должны следовать определенному шаблону

\[commit\]
template = ~/.commit-template

 

Если вдохновило - полный ман [тут](http://git-scm.com/book/ru/%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-Git-%D0%9A%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-Git).
