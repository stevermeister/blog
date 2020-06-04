---
title: "MacOs: Don't show specific app icon on Dock"
tags: "dock,mac,Uncategorized"
date: "2017-12-15"
---

I have a hotkey for the terminal that why I decided to hide the terminal icon from Dock, but it appeared to be not so easy.

You need to go to app contents (by doing right click -> "**Show Package Contents**") and change **Info.plist** file - add special key:

**<key>LSUIElement</key>** **<true/>**

(it could be added to the end of the file):![](images/Screen-Shot-2017-12-15-at-14.38.46.png)
