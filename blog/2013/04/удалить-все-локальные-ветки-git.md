---
title: "Удалить все локальные ветки git"
tags: "git"
date: "2013-04-09"
---

Команда для того чтобы удалить все смерженые(**_-merged**) ветки за исключением текущей(**_v '\*'**):

```
git branch --merged | grep -v '\*' | xargs git branch -D
```

еще для себя я сделал такую алиас-команду для полной зачистки репозитория от изменений и старых веток:

```
alias git-clean="git branch  | grep -v '\*' | grep -v 'develop' | xargs git branch -D  && git reset --hard && git clean -d -x -f"
```

критика приветствуется.
