---
title: "Disable chrome profile button does not work anymore"
tags: "Хочу сделать мир лучше"
date: "2015-08-01"
---

In previous chrome version it was very convenient profile switcher: it's only 2 clicks and you are there. But they decided to update it, why? Now you have this ugly button:

![not convenient profile button](images/4b1AkUUooO_vDsOGQHRSP6yS-g26xCYyR5X3FzbPSxM.png)

instead of icon. And with this button I'll have dropdown, then model, then...

Before it was possible to switch off this new "feature" in [chrome://flags](chrome://flags/), but with new version off chrome it's not possible anymore.

But it's still possible to run browser with this flag (_thx for [@zerkms](https://github.com/zerkms) for the hint_):

\[shell\] --disable-new-avatar-menu \[/shell\]

So I've created **AppleScript** with shell command to to run chrome with that flag:

\[shell\] do shell script "/Applications/Google\\\\ Chrome.app/Contents/MacOS/Google\\\\ Chrome --disable-new-avatar-menu & killall ChromeScript.app" \[/shell\]

saved it as an application and added to startup apps list. And now I'm happy again :)

The mac chrome-runner [application](https://github.com/stevermeister/chrome-runner/raw/master/mac/chromeRunner.zip) is on [github](https://github.com/stevermeister/chrome-runner).
