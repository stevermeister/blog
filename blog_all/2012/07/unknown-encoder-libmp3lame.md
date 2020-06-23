---
title: "Unknown encoder 'libmp3lame'"
tags: "codecs,ffmpeg,ubuntu,Хочу сделать мир лучше"
date: "2012-07-28"
---

Using **WinFF** converter or simply **ffmpeg** from console you could get following message:

_Unknown encoder 'libmp3lame'_

To fix this issue you should type next command:

sudo apt-get install libavcodec-extra-52

**UPD**: For new version of ubuntu you should type:

sudo apt-get install libavcodec-extra-53
