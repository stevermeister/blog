---
title: "Git pre-push hook"
tags: "deploy,git,git-hook,javascript,pre-push,Хочу сделать мир лучше"
date: "2015-03-13"
---

Я уже писал о том [как можно использовать git хуки для запуска grunt команд](https://stepansuvorov.com/blog/2013/01/git-hook/ "git hook: Не пускаем в репозиторий ошибки") и делать предварительную проверку перед заливкой кода в главный репозиторий. В этой заметке я покажу, как можно избежать проверки не закомиченных изменений.

Git pre-push hook будет выглядеть вот так:

\[shell\] #!/bin/sh grunt test RETVAL=$? if \[ $RETVAL -ne 0 \] then echo "Grunt task failed, exiting..." exit 1 fi

echo "Complete." \[/shell\]

Как видите ничего сложного. Теперь при каждом пуше будет вызываться "**grunt test**". Важно не забыть сделать этот файл исполняемым (**chmod +x pre-push**)

Есть еще один момент: когда вы попытались запушить поломанный код - тесты не прошли - вы починили код, но при этом забыли закоммитить - тесты прошли - и поломанный код попал на сервер (так как фикс не был закоммичен).

Поэтому перед началом тестов прячем все незакоммиченные изменения (**git stash**), а потом возвращаем их назад:

\[shell\] #!/bin/sh CHANGES=$(git diff --numstat | wc -l) CHANGES\_CACHED=$(git diff --cached --numstat | wc -l) TOTAL\_CHANGES=$(($CHANGES + $CHANGES\_CACHED))

git stash -k grunt test

RETVAL=$?

if \[ $TOTAL\_CHANGES -ne "0" \] then echo "Popping" $TOTAL\_CHANGES "changes off the stack..." git stash pop -q fi

if \[ $RETVAL -ne 0 \] then echo "Grunt task failed, exiting..." exit 1 fi

echo "Complete." \[/shell\]

Полный код [тут](https://gist.github.com/stevermeister/e530409b19daac932ee2 "gist"). Идея взята от [сюда](https://old.briangonzalez.org/posts/run-grunt-task-pre-push-to-git-repo "https://old.briangonzalez.org/posts/run-grunt-task-pre-push-to-git-repo").
