---
title: "Angular & Rxjs: Отписываться или не отписываться?"
tags: "Angular,RxJs,RxJS.takeUntil"
date: "2017-06-03"
---

Как вы наверное уже знаете при подписке на обозреваемую последовательность либо просто событие в Javascript вы обычно должны в определенный момент отписываться, чтобы освободить память. Иначе это приведет к утечке памяти.

Мы рассмотрим основные случаи, когда вы должны отписываться в **ngOnDestroy** хуке компонента, а также случаи, когда можно не отписываться.

## Нужно отписываться

**Формы**

необходимо отписываться от формы и от отдельных формконтролов, на которые подписались:

```typescript
export class TestComponent {

  ngOnInit() {
    this.form = new FormGroup({...});
    this.valueChangesSubscription  = this.form.valueChanges.subscribe(console.log);
    this.statusChangesSubscription = this.form.statusChanges.subscribe(console.log);
  }

  ngOnDestroy() {
    this.valueChangesSubscription.unsubscribe();
    this.statusChangesSubscription.unsubscribe();
  }
}
```

**Роутер**

Согласно официальной документации **Angular** должен сам отписывать вас, [но этого не происходит](https://github.com/angular/angular/issues/16261), поэтому:

```typescript
export class TestComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(console.log);
    this.route.queryParams.subscribe(console.log);
    this.route.fragment.subscribe(console.log);
    this.route.data.subscribe(console.log);
    this.route.url.subscribe(console.log);
    
    this.router.events.subscribe(console.log);
  }

  ngOnDestroy() {
    // You should unsubscribe from each observable here
  }

}
```

**Рендерер**

```typescript
export class TestComponent {
constructor(private renderer: Renderer2, 
            private element : ElementRef) { }

  ngOnInit() {
    this.clickSubscription = this.renderer.listen(this.element.nativeElement, "click", handler);
  }

  ngOnDestroy() {
    this.clickSubscription.unsubscribe();
  }

}
```

**Бесконечные обозреваемые последовательности**

Примерами бесконечных могут служить последовательности созданные с помощью **interva()** или слушающие события (**fromEvent()**):

```typescript
export class TestComponent {

  constructor(private element : ElementRef) { }

  interval: Subscription;
  click: Subscription;

  ngOnInit() {
    this.intervalSubscription = Observable.interval(1000).subscribe(console.log);
    this.clickSubscription = Observable.fromEvent(this.element.nativeElement, 'click').subscribe(console.log);
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
    this.clickSubscription.unsubscribe();
  }

}
```

**ngRx**

От подписок на состояние **Store ngRx** тоже необходимо отписываться:

```typescript
export class TestComponent {

  constructor(private store: Store) { }

  todos: Subscription;

  ngOnInit() {
     this.todosSubscription = this.store.select('todos').subscribe(console.log);  
  }

  ngOnDestroy() {
    this.todosSubscription.unsubscribe();
  }

}
```

 

## Отписываться НЕ нужно

**Async pipe**

C async pipe нам повезло и он выполнят работу под отписке за нас:

```typescript
@Component({
  selector: 'test',
  template: `<todos [todos]="todos$ | async"></todos>`
})
export class TestComponent {

  constructor(private store: Store) { }

  ngOnInit() {
     this.todos$ = this.store.select('todos');
  }

}
```

**@HostListener**

так же нам не нужно отписываться, когда мы навешиваем слушатель события с помощью HostListener:

```typescript
export class TestDirective {

  @HostListener('click')
  onClick() {
    ....
  }


}
```

**Конечные обозреваемые последовательности**

Бывают последовательности, которые сами завершаются, такие как **HTTP** и **timer**:

```typescript
export class TestComponent {

  constructor(private http: Http) { }

  ngOnInit() {
    Observable.timer(1000).subscribe(console.log);
    this.http.get('http://api.com').subscribe(console.log);
  }


}
```

## Bonus

Также вы можете использовать оператор **[takeUntil](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/takeuntil.md)**, который позволит писать код в декларативном стиле, не отписываясь от каждого обозревателя отдельно:

```typescript
export class TestComponent {

  constructor(private store: Store) { }

  private componetDestroyed: Subject = new Subject();
  todos: Subscription;
  posts: Subscription;

  ngOnInit() {
     this.todosSubscription = this.store.select('todos').takeUntil(this.componetDestroyed).subscribe(console.log); 

     this.postsSubscription = this.store.select('posts').takeUntil(this.componetDestroyed).subscribe(console.log); 
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }

}
```

Кроме **takeUntil** вы еще можете использовать [take](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/take.md), [takeWhile](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/takewhile.md) и [first](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/first.md) которые также позволят "убить" последовательность, соотвественно не прийдется от нее отписываться.

 

Большая часть материала взята из статьи [When to Unsubscribe in Angular](https://netbasal.com/when-to-unsubscribe-in-angular-d61c6b21bad3).
