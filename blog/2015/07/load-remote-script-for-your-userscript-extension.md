---
title: "Load remote script from your userscript extension"
tags: "javascript,userscripts,Хочу сделать мир лучше"
date: "2015-07-25"
---

Just not to lose snippet/solution that I'd been looking for quite some time paste it here:

\[javascript\] var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})}; \[/javascript\]

and example (loading jQuery):

\[javascript\] loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() { $("#answer-6825715").css("border", ".5em solid black"); }); \[/javascript\]

taken from [stackoverflow](https://stackoverflow.com/a/6825715/274500).
