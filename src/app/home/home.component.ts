import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  links$: Observable<any> = this.scully.available$;
  articles$: Observable<any>;

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit() {
    this.articles$ = this.links$.pipe(map(articles => articles.filter(article => article.route !== '/')));
    this.links$.subscribe((links) => {

      console.log(links);
    });
  }
}
