---
title: "Сделаем gulp javascript проекту"
tags: "grunt,gulp,javascript,Хочу сделать мир лучше"
date: "2014-03-04"
---

![](images/gulp.png "gulp logo")

[Gulp.js](https://gulpjs.com/) это потоковый сборщик проектов на **JavaScript**, интересная альтернатива [Grunt.js](https://gruntjs.com/ "gruntjs.com").

## Установка

сначала глобально, чтобы можно было вызывать из командной строки:

$ sudo npm install gulp -g

потом локально, в папку проекта, чтобы его могла вызывать нода:

$ npm install gulp

проверим:

$ gulp --version
\[gulp\] CLI version 3.5.2
\[gulp\] Local version 3.5.2

установка [плагинов](https://gratimax.github.io/search-gulp-plugins/):

$ npm install gulp-livereload gulp-imagemin gulp-uglify gulp-concat

## Создание конфигурационного файла

Для **gulp** конфигурационным файлом является **gulpfile.js**.

Для начала можем создать этот файл со следующим содержимым:

var gulp = require('gulp');

gulp.task('default', function(){
  // place code for your default task here
});

и запустить, выполнив команду:

$ gulp
\[gulp\] Using file .../gulpfile.js
\[gulp\] Working directory changed to ...
\[gulp\] Running 'default'...
\[gulp\] Finished 'default' in 58 μs

Принцип вызова тасков из командной строки полностью идентичен **Grunt.js**.

Инициализация/подключение **плагинов**:

var livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('connect');

 

## Пишем свои задания

Методы **gulp**, которые могут понадобиться при создании таска:

Метод

Синтаксис

ПримеР

gulp.**task**

 gulp.task(name\[, deps\], fn)

gulp.task('do-log',
  function(){console.log('Hello!')
});

gulp.task('test', \['do-log'\]);

gulp.**src**

 gulp.src(globs\[, options\])

gulp.src('./gulpfile.js')

gulp.**dest**

 gulp.dest(path)

gulp.dest('main.min.css')

gulp.**watch**

 gulp.watch(glob \[, opts\], tasks) or gulp.watch(glob \[, opts, cb\])

var watcher = gulp.watch('js/\*\*/\*.js',
             \['uglify','reload'\]);
watcher.on('change', function(event){
  console.log(event.path+' -> '+event.type);
});

gulp.watch('gulpfile.js', function(changes){
console.log(changes) });

gulp.**run**

 gulp.run(task)

 gulp.run('subtask')

Если собрать все методы в одном примере получим:

var gulp = require('gulp'),
    jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  gulp.src('./gulpfile.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('do-log', function(){
	gulp.watch('\*.js', function(changes){
		console.log(changes);
		gulp.run('jshint');
	});
});

gulp.task('start', \['do-log'\]);

\- при изменении любого javascript файла (\*.js) - выводим изменения в консоль и запускаем **jshint**\-задание.

Вы уже вероятно обратили внимание что вся последовательность действий связанна через **pipe**\-метод передающий по цепочке поток данных (**stream**). Концепция взята из [node.js стримов](https://github.com/substack/stream-handbook).

С **gulp** можно прекрасно работать и не понимая, что происходит внутри **pipe**, но если вы уже перешли на следующий уровень и хотите "вклиниться в поток" либо написать свой **плагин**, то думаю вам может помочь разобраться этот пример:

function myPlugin(){
  var stream = through.obj(function (file, enc, callback) {
    console.log(file, enc, callback);
    this.push(file);
    return callback();
  });

  return stream;
}
var through = require('through2');
gulp.task('jshint', function() {
  gulp.src('./gulpfile.js')
  .pipe(myPlugin())
   .pipe(jshint())
   .pipe(jshint.reporter('default'));
});

Методом **myPlugin** мы вклиниваемся в поток выполнения при этом не нарушая его: возвращаем **stream**. Вместо

console.log(file, enc, callback);

может быть ваш код по изменению контента.

## Запуск локального сервера

так же делается довольно просто

var connect = require('gulp-connect');
gulp.task('server', function() {
    connect
        .use(connect.static('./public'))
        .listen('3000');
});

 

 

Материалы, которые вдохновляли на пост:

- [Gulp This](https://laracasts.com/lessons/gulp-this)
- [GulpJS — фантастически быстрый сборщик проектов](https://habrahabr.ru/post/208890/)
- [Build Wars](https://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/)
- [An Introduction to Gulp.js](https://www.sitepoint.com/introduction-gulp-js/)
- [Writing Tasks](https://tooling.github.io/book-of-modern-frontend-tooling/build-systems/gulp/writing-tasks.html "https://tooling.github.io/")
