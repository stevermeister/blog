---
title: "Как на Mac открыть файл в Sublime из терминала"
tags: "mac,Sublime,terminal"
date: "2015-04-09"
---

На всякий случай сделаю заметку, чтобы не забыть. Так как по умолчанию команда не прописывается в bin, нужно это сделать самому:

```
$ ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime
```

после чего можно будет удобно открывать файлы в терминале с помощью Sublime:

```
$ sublime workspace/site/index.html
```
