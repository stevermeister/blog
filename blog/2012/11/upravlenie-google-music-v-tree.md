---
title: "Управление Google music в трее"
tags: "google,music,ubuntu"
date: "2012-11-28"
slug: "управление-google-music-в-трее"
---

![](images/Google-Music-Beta-Icon.png "Google-Music-Beta-Icon")

Только подумал написать приложение, которое бы создало **панель управления google music** в трее **ubuntu**(т.е. чтобы можно было выключать/выключать музыку и переключать композиции не заходят на сайт), оказалось уже реализовано.

Установка под катом.

Добавляем необходимый репозиторий:

для **<12.04**:

sudo add-apt-repository ppa:nuvola-player-builders/stable

для **12.10**:

sudo add-apt-repository ppa:nuvola-player-builders/unstable

и дальше стандартно:

sudo apt-get update
sudo apt-get install nuvolaplayer

Запускаем Nuvola Player авторизируемся там на сайте во frame приложения и наслаждаемся результатом.
