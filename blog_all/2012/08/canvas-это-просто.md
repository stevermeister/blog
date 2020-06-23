---
title: "Canvas - это просто!"
tags: "canvas,html5,javascript,Хочу сделать мир лучше"
date: "2012-08-21"
---

Наконец-то появилось время разобрать принципы анимации с использованием HTML canvas элемента.

Вот что получилось:

<script type="text/javascript">// <![CDATA[ var ctx = document.getElementById('tutorial').getContext("2d"); animate(); function animate(){var x = 37;pacmanGo(x);} function pacmanGo(x){ setTimeout(function(){ ctx.clearRect(0,0,300,75); drawBlocksLine(75, 35, 5, x); drawPacman(x, 37); x += 5; if(x > 250)return; pacmanGo(x); }, 250); }function drawPacman(x, y){ ctx.beginPath(); ctx.fillStyle = "rgb(225,225,0)"; ctx.arc(x,y,13,Math.PI/7,-Math.PI/7,false); ctx.lineTo(x-3,y); ctx.fill(); }function drawBlocksLine(x, y, number, pacman_step_x){ ctx.fillStyle = "rgb(0,200,0)"; for(i=0;i<number;i++){ if(x+i*30 > pacman_step_x){ ctx.fillRect(x+i*30,y,4,4); }}} // ]]></script>

 Подробности под катом.

Итак поехали:

<canvas id="tutorial" width="150" height="150"></canvas>

\- добавляем HTML элемент в страницу. Для рисования необходимо обратиться к нему на javascript и получить контекст:

var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');

На данный момент 2д - единственный возможный контекст, поэтому с этим тоже не заморачиваемся.

Вот мы и перешли к самой интересной части - нанесение изображения. Объект контекста содержит много различных методов, например:

ctx.fillRect (5, 5, 55, 50); // рисуем прямоугольник

Мы можем задать стиль для нашего прямоугольника:

ctx.fillStyle = "rgb(35, 200, 35)"; // сначала задаем стиль
ctx.fillRect (5, 5, 55, 50); // потом рисуем прямоугольник

Вроде бы все просто. Все методы, понятное дело, разбирать не будем. Вот есть схемка, которая поможет:

[![canvas](images/HTML5_Canvas_Cheat_Sheet-300x221.png "HTML5_Canvas_Cheat_Sheet")](http://stepansuvorov.com/blog/wp-content/uploads/2012/08/HTML5_Canvas_Cheat_Sheet.png)

А в чем заключается анимация? В том что мы по времени перерисовываем картинку, или другими словами - меняем координаты/параметры движимых объектов.

Как видите ничего сложного нет. Нужны только фантазия и справочник по методам.

С кодом примера можно поиграться вот тут: http://learn.javascript.ru/play/lZqarb

Добавлю еще две иллюстрации, которые я нашел в сети, о том как рисовать дуги:

arc(x, y, radius, startAngle, endAngle, anticlockwise);

О принципе отсчета угла: [![](images/canvas_arc-300x242.jpg "canvas_arc")](http://stepansuvorov.com/blog/wp-content/uploads/2012/08/canvas_arc.jpg)

О радианах:

[![](images/canvas_arc2-300x277.jpg "canvas_arc2")](http://stepansuvorov.com/blog/wp-content/uploads/2012/08/canvas_arc2.jpg)

[Источник](http://net.tutsplus.com/tutorials/javascript-ajax/canvas-from-scratch-advanced-drawing/) этих прекрасных эскизов.
