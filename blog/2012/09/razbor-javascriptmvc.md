---
title: "Разбор JavaScriptMVC"
tags: "javascript,JavascriptMVC"
date: "2012-09-06"
slug: "разбор-javascriptmvc"
---

\*Для тех, кто подумал что я пропустил пробел перед MVC, скажу: нет - JavaScriptMVC - это название фреймворка.

![](images/javascriptmvc_logo.png "javascriptmvc_logo")

Информации в интернете о нем не так много, поэтому попробуем разобрать вместе как его устанавливать и использовать.

Для начала [выкачаем](https://github.com/downloads/jupiterjs/javascriptmvc/javascriptmvc-3.2.2.zip "javascriptmvc download") фреймворк себе в директорию проекта либо на уровень выше. Изучаем структуру папок и файлов:

documentjs - документатор 
funcunit - приложение для тестирования 
jquery - jquery и его расширения - jQueryMX 
steal - менеджер подгрузки скриптов и зависимостей 
js,js.bat - командная строка для Linux/Mac и Windows

Разбор начнем с менеджера подгрузки скриптов **steal**, с которого все и начинается. Метод **steal** имеет довольно простой синтаксис:

steal(param1, param2, param3, ...)

В параметре мы можем передавать как путь к файлу, который нужно подгрузить, так и callback-функцию, которая выполнится после загрузки файла. Что касается пути, то можно указывать относительный путь от корня фреймворка и сократить расширение .js(он его добавит сам), т.е.:

steal('jquery/class')

_ это значит что он подключит файл %framework_path%/jquery/class.js

Внимание. Так как **steal** работает асинхронно, то мы должны помещать код, который зависит от подключаемого модуля в callback:

steal('jquery/class', function(){ $.Class })

Идем дальше. Все классы в системе создаются вызовом метода

$.Class([name,] [classProps,] [prototypeProps])

Чтобы создать класс модели используется метод

$.Model(name, classProps, prototypeProps)

Пришло время переходить к реальным примерам. Создаем в корне папку нашего проекта, например "_todos_". Помещаем в нее 2 файла: todos.html и todos.js.

todos.html:

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
    </head>
<body>
    <ul id='todos'></ul>
    <input id='editor'/>
    <script type='text/javascript' src='../steal/steal.js?todos/todos.js'></script>
</body>
</html>

Всего лишь небольшой кусок HTML кода с подключением второго файла - **todos.js** через **steal.js**.

Теперь перейдем к более интересному - внутренностям **todos.js**:

steal('jquery/class',
      'jquery/model',
      'jquery/dom/fixture',
      'jquery/view/ejs',
      'jquery/controller',
      'jquery/controller/route',
       function($){
             $.Model('Todo',{
                     findAll : "GET /todos",
                     findOne : "GET /todos/{id}",
                     create  : "POST /todos",
                     update  : "PUT /todos/{id}",
                     destroy : "DELETE /todos/{id}"
            },{});
      }
)

Подключили необходимые модули, создали основную модель. Играем дальше. Чтобы создать объект нашей модели делаем:

var todo = new Todo({name: "do the dishes"});

Появился объект с атрибутом name. Чтобы получить или изменить атрибут используем метод `**attr**.`

todo.attr('name') //получит значение атрибута 
todo.attr('name', "wash the dishes" ); // перезапишет значение

Класс модели использует статические методы для создания, чтения, обновления и удаления сущностей на сервере ( findAll, findOne, create, update, and destroy ), т.е.:

Todo.findAll({})

Но, так как серверной части у нас еще нет, - методы соответственно не отработают так как нам нужно. Хорошо что в фреймворке это учли и сделали заглушки, с помощью которых мы сможем эмулировать серверные ответы. Заглушка реализуется с помощью метода **fixture**:

$.fixture(url, fixture(original, settings, headers) )

возвратить функция **fixture**(не путать callback функцию и метод **fixture**) должна следующую структуру:

return [ status, statusText, responses, responseHeaders ];

например:

return [ 200, "success", {json: []}, {} ];

Добавим в наш код(это который в **todos.js**) эти заглушки для каждого запроса:

// массив данных
var TODOS = [
{id: 1, name: "wake up"},
{id: 2, name: "take out trash"},
{id: 3, name: "do dishes"}
];

$.fixture("GET /todos", function(){
return [TODOS]
});

$.fixture("GET /todos/{id}", function(orig){
return TODOS[(+orig.data.id)-1];
})

var id= 4;
$.fixture("POST /todos", function(){
return {id: (id++)}
})

$.fixture("PUT /todos/{id}", function(){
return {};
})

$.fixture("DELETE /todos/{id}", function(){
return {};
})

Можем проверить как оно работает:

Todo.findAll({}, function( todos ) {
    console.dir( todos );
})

Для создания и обновления мы вызываем метод **save**:

// create 
var todo = new Todo({name: "mow lawn"}) 
todo.save(function(todo){ console.dir( todo ); }) 

// update todo.attr("name", "mow my lawn") 
todo.save(function(todo){ console.dir( todo ); })

Еще мы можем на модель вешать обработчики событий методом **bind**:

.bind( event, handler(ev, todo ) )

например:

var todo = new Todo({name: "mow lawn"});
todo.bind('created', function(ev, todo){
 console.log("created", todo );
})
todo.save()

При вызове todo.save()сработает обработчик события _created_.

Мы рассмотрели принцы организации моделей во фреймворке, теперь перейдем к представлению. Оно реализовано через метод **View**:

$.View( idOrUrl, data )

где **id0rUrl** - ID элемента(либо имя файла), который содержит шаблон, а **data** - данные передаваемые в этот шаблон. Вот пример шаблона:

<% for(var i = 0; i < this.length; i++ ) { %> 
    <li><%= this[i].name %></li>  
<% } %>

который мы сохранили в файл todos.ejs. Возвращает этот метод обработанный шаблон:

Todo.findAll( {}, function( todos ){
    console.log( $.View( 'todos.ejs', todos ) );
});

в данном случае мы получили элементы для модели и вывели их через шаблон. Также стоит упомянуть что фреймворк расширяет стандартные методы JQuery для работы с HTML, такие как: after, append, before, html, prepend, replaceWith и text. Теперь в них мы тоже можем использовать шаблоны:

$('#todos').html( 'todos.ejs', todos );

Теперь перейдем к организации контроллера, который также основан на вызове метода **Controller**:

$.Controller(name, classProps, prototypeProps)

с помощью этого метода создается класс JQuery виджета:

$.Controller("Todos", 
            { "init" : function( element , options ){ 
                   this.element.html('todos.ejs', Todo.findAll() ) 
                    } 
})

и теперь мы можем создать сам виджет:

new Todos('#todos', {});

который прикрепится к контейнеру #todos и выведет записи по запросу `Todo.findAll()` через шаблон `todos.ejs.`

Тут также не стоит путать виджет контроллера **Todos** и класс модели **Todo**.

Обязательно параллельно проверяйте все в коде и экспериментируйте с различными вариантами.

Поговорим более подробно о методе **init** класса контролера, который будет вызван при создании объекта и имеет следующий синтаксис:

$.Controller.prototype.init(element, options)

где element - это элемент, на который навесили виджет обернутый в JQuery, a options - это опции(как подсказывает кэп), который расширяют настройки заданные по умолчанию. Пример создания нескольких виджетов с параметрами:

//определяем класс $.Controller("Todos", { defaults : {template: 'todos.ejs'} }, { "init" : function( element , options ){ element.html(options.template, Todo.findAll() ) } }) // а теперь создаем виджеты new Todos( document.body.firstElementChild ); new Todos( $('#todos'), {template: 'specialTodos.ejs'})

Также в при создании класса контроллера мы можем сразу же прописать обработчики для событий на элементе виджета следующим образом:

$.Controller("Todos",
            { "init" : ...,
              "li click" : function(element, event){
                      console.log("You clicked", li.text() )
                      // тригерим событие чтобы дать знать другим
                      element.trigger('selected');
                    }
             })

как видно из примера мы имеем следующий синтаксис для навешивания обработчиков:

"[selector] [event]"

Т.е. селектор, причем может быть составной селектор и событие. К сожалению, данный синтаксис не поддерживает множественные события(ну или я не разобрался полностью). Но зато поддерживает динамические шаблоны для подстановки события, выглядит это следующим образом:

"li .destroy {Events.destroy}" : function(el, ev){ ... }

а теперь инициализируем событие:

Events = {destroy: "click"};

Также хорошим стилем является триггер нашего события дальше:

element.trigger('selected');

Т.е. мы отметили что состоялось событие не просто клик, а уже совершилось событие _selected_.

Удалять созданные виджеты мы можем 2мя способами: стандартно JQuery-style через удаление элемента - `$("#todos").remove()`, либо с помощью метода виджета `.destroy()`

Кроме контроллера виджетов в фреймворке есть еще контроллер роутов, который создается следующим образом:

$.Controller("Routing",
             { "route" : function(){//сюда попадаем при пустом хеше }, 
               "todos/:id route" : function(data){ //с параметром } 
}) 

// создаем контроллер
new Routing(document.body);

Как он работает? Он использует метод **$.route**, который в свою очередь представляет из себя **jQuery.Observe** наблюдающий за состоянием **window.location.hash**.

Мы можем непосредственно влиять на hash через этот метод:

$.route.attr('id','6') // location.hash = #!todos/6
// или так
var hash = $.route.url({id: 7}) // #!todos/7 
location.hash = hash;

Более сложный вариант роутера:

$.Controller("Routing",
             {init : function(){ 
                  this.editor = new Editor("#editor") 
                  new Todos("#todos"); 
              }, 
             "route" : function(){ ... }, 
             "todos/:id route" : function(data){ ... }, 
             ".todo selected" : function(el, ev, todo){ $.route.attr('id',todo.id); } 
}); 

new Routing(document.body);

Хочу обратить внимание на вариант, когда когда мы выставляем контроллер не на изменение хеша, а на действие _.todo selected_, но при этом меняем хеш через _$.route.attr('id',todo.id)_.

Из основного это все.
