import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit {
  links$: Observable<any> = this.scully.available$;
  articles$: Observable<any>;

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {
    this.articles$ = this.links$.pipe(map(articles => articles.filter(article => article.route !== '/')));
  }

}
