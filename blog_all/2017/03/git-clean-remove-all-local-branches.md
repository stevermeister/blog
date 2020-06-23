---
title: "git-clean: Remove all local branches"
tags: "git,git-clean,Uncategorized"
date: "2017-03-08"
---

Made a [note](http://stepansuvorov.com/blog/2013/04/%D1%83%D0%B4%D0%B0%D0%BB%D0%B8%D1%82%D1%8C-%D0%B2%D1%81%D0%B5-%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%B2%D0%B5%D1%82%D0%BA%D0%B8-git/) about it 4 years ago, but it looks like the note is still pretty usefull. So one more time for en readers.

To remove all merged branches(except current -v '\*'):

git branch --merged | grep -v '\*' | xargs git branch -D

also I made such command for repo complete clean up:

alias git-clean="git branch  | grep -v '\*' | grep -v 'master' | xargs git branch -D  && git reset --hard && git clean -d -x -f"
