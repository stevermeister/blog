---
title: "WebStorm/PhpStorm настраиваем и используем Live Edit"
tags: "LiveEdit,phpStorm,webStorm"
date: "2012-12-26"
slug: "webstormphpstorm-настраиваем-и-используем-live-edit"
---

[![](images/phpstorm_logo-300x225.png "phpstorm_logo")](https://stepansuvorov.com/blog/wp-content/uploads/2012/12/phpstorm_logo.png)

Как извесно с пятой версии в **WebStorm/PhpStorm** появилась новый плагин под названием **LiveEdit**, который дает возможность писать код и сразу смотреть результат.

Вот прекрасное видео, которое демострирует возможности плагина:

<iframe src="https://www.youtube.com/embed/TnnVl3ydIB0" frameborder="0" width="560" height="315"></iframe>

 

Если понравилось - пару слов о найстройке:

По умолчанию плагин уже активирован в редакторе, нужно только проверить в настройках чтобы стояли галочки:

[![](images/liveedit_settings-300x75.png "liveedit_settings")](https://stepansuvorov.com/blog/wp-content/uploads/2012/12/liveedit_settings.png)

Далее найти файл

```
/PhpStorm/plugins/JavaScriptDebugger/extensions/HowToInstallGoogleChromeExtension.html
```

с инструкцией по установке **расширения для Chrome**: в большей части случаев она заключает в том, чтобы установить новое расширение  из файла /PhpStorm/plugins/JavaScriptDebugger/extensions/jb.crx

Для **Linux** есть своя специфика:

```
$ sudo mkdir -p -m0777 /opt/google/chrome/extensions
```

На свякий случай ссылка на страничку с возможными проблемами: [https://confluence.jetbrains.net/display/WI/LiveEdit](https://confluence.jetbrains.net/display/WI/LiveEdit)
