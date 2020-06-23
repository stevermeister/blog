---
title: "zxcvbn or check your password"
tags: "dropbox,npm,password,Рекомендую"
date: "2016-05-28"
---

![password_strength](images/password_strength.png)

[zxcvbn](https://github.com/dropbox/zxcvbn) is nice open source project from Dropbox that helps you to evaluate strength of your password and also provides some hints how to improve it.

To install via npm:

$ npm install zxcvbn
$ node
\> var zxcvbn = require('zxcvbn');
\> zxcvbn('Tr0ub4dour&3');
