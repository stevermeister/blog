---
title: "Minimal set for Github OAuth with AngularJS and Node.js"
tags: "API,github,OAuth,Хочу сделать мир лучше"
date: "2015-03-12"
---

I so many times had returned back to this topic that decided to create kind of hint/note for myself and probably it also could be useful for the audience.

## Applications on Github

To make possible github OAuth on your app you first should to register your application [there](https://github.com/settings/applications "https://github.com/settings/applications"). And get set of necessary params:

- **Client ID**
- **Client Secret**

## Algorithm

I'll not go in all the details, because there are a lot of manuals in internet. Only resume. In 7 steps:

1. **web application** provides user **authorisation link** to **github**
2. **user** follows this link and **confirms authorisation**
3. **github** redirects user back to our site with special **code parameter** in url
4. our **web application** gets this **code parameter** and sends it to the **server**
5. **server** creates **OAuth request** based on this code and our api secret and sends it to **github**
6. **github** responses to our **server** with **OAuth token**
7. **server** provide **token** to the **web application**

## Authorisation link

it's just a link of such format:

https://github.com/login/oauth/authorize?client\_id=%YOUR\_APP\_ID%

## Web Application part

I've created simple example of **Angular service** that will send **code** parameter to the server:

\[javascript\] angular.module('config-builder') .service('Github', function($http) {

var token = null;

this.getTokenPromise = function(code) { return $http.get('/api/github/token/' + code).then(function(result){ token = result.data.access\_token; }); }; }); \[/javascript\]

## Server side

And server side part to send OAuth token request:

\[javascript\] app.get('/api/github/token/:code', function(req, res) { request.post({ uri: 'https://github.com/login/oauth/access\_token', form: { client\_id: '%YOUR\_APP\_ID%', client\_secret: '%YOUR\_APP\_SECRET%', code: req.params.code }, json: true }, function(err, httpResponse, body) { if (err) { res.send(500, { error: err }); return; } res.send(body); }); }); \[/javascript\]

**app** - is an instance of [express](https://expressjs.com/ "https://expressjs.com/") framework in this case.

That's all!
