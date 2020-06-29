---
title: "JavaScript for detecting browser language preference"
tags: "i18n,javascript"
date: "2015-01-06"
---

Just not to forget:

```javascript 
  var language = window.navigator.userLanguage || window.navigator.languages[0];  
 ```

and more crazy(but more trustful) way:

```javascript 
  $.ajax({ url: "https://ajaxhttpheaders.appspot.com", dataType: 'jsonp', success: function(headers) { var language = headers['Accept-Language']; } });  
 ```
