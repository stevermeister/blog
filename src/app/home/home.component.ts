import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, map, pluck, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from '../article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  articles$: Observable<Article[]>;
  limit$: BehaviorSubject<number>;
  tag$: Observable<string>;
  search$: Observable<string>;


  constructor(private articleService: ArticleService, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.limit$ = new BehaviorSubject(10);
    this.tag$ = this.activeRoute.queryParams.pipe(pluck('tag'));
    this.search$ = this.activeRoute.queryParams.pipe(pluck('s'));

    combineLatest([this.tag$, this.search$, this.limit$]).subscribe(([tag, search, limit]) => {
      this.loadArticles(tag, search, limit);
    });
  }

  loadMore() {
    this.limit$.next(this.limit$.getValue() + 10);
  }

  loadArticles(tag: string, search: string, limit: number) {
    this.articles$ =
      this.articleService.getFilteredArticles(tag, search, limit);
  }
}
