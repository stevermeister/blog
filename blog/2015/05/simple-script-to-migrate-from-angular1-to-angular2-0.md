---
title: "Simple script to migrate from Angular1.* to Angular2.0"
tags: "AngularJs,humor,Хочу сделать мир лучше"
date: "2015-05-05"
---

Angular team is still working on this script, but [Todd Motto](https://toddmotto.com/) has already provided us first version. It's really simple:

[javascript] var ngMigrate = (function () { var v2uri = 'https://code.angularjs.org/2.0.0-alpha.19/angular2.js';

return function (version) { var v1 = document.querySelector('script[src\*=angular]'); if (!v1) return; var body = document.body; var script = document.createElement('script'); script.async = script.src = v2uri; body.removeChild(v1); body.appendChild(script); }; })();

ngMigrate('2.0'); [/javascript]

[Here](https://jsfiddle.net/toddmotto/7zLL6sqs/) you can play with the code.

And one more brilliant idea from Todd - [here](https://fiddle.jshell.net/toddmotto/0u84Ledh/show/) - tool to define which type of service you should use (service, factory or provided). You can safely provide this link to you colleagues if somebody asks you to help with this question.
