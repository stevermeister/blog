---
title: "How to catch Angular ui-router resolve errors"
tags: "AngularJs,debug,javascript,ui-router"
date: "2015-07-09"
---

It's more than annoying to have just a blank page and no errors in console when your issue is inside **ui-router resolve**. Finally I found a pretty nice solution, don't know why it's not provided "from the box". In case of error ui-router sends specific event **[$stateChangeError](https://github.com/angular-ui/ui-router/wiki#state-change-events)** that we could listen for:

```javascript 
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ console.error(error); });  
 ```

and now wow! we have an exact error in console and no need to guess what's wrong with your code anymore.
