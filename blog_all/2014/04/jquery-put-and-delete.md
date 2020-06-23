---
title: "jQuery: $.put and $.delete"
tags: "ajax,javascript,jQuery,Хочу сделать мир лучше"
date: "2014-04-01"
---

**jQuery Ajax** helpers set does not have shortcuts for  **PUT** and **DELETE** methods, but nothing prevents us to make them ourselves.

## put

\[javascript\] $.put = function(url, data, callback, type){

if ( $.isFunction(data) ){ type = type || callback, callback = data, data = {} }

return $.ajax({ url: url, type: 'PUT', success: callback, data: data, contentType: type }); } \[/javascript\]

## delete

\[javascript\] $.delete = function(url, data, callback, type){

if ( $.isFunction(data) ){ type = type || callback, callback = data, data = {} }

return $.ajax({ url: url, type: 'DELETE', success: callback, data: data, contentType: type }); } \[/javascript\]

And short form for both is:

\[javascript\] jQuery.each( \[ "put", "delete" \], function( i, method ) { jQuery\[ method \] = function( url, data, callback, type ) { if ( jQuery.isFunction( data ) ) { type = type || callback; callback = data; data = undefined; }

return jQuery.ajax({ url: url, type: method, dataType: type, data: data, success: callback }); }; });\[/javascript\]
