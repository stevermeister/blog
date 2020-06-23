---
title: "Mac AirPlay problem fix"
tags: "AirPlay,fix,mac,Хочу сделать мир лучше"
date: "2013-09-01"
---

Just want to share the recipe how we can fix problem of unselectable **AirPlay** (btw works also for **AppleTV**) stream option:

sudo kill \`ps -ax | grep 'coreaudiod' | grep 'sbin' |awk '{print $1}'\`
