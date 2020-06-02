import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, pluck, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  articles$: Observable<any>;
  limit = 10;


  constructor(private articleService: ArticleService, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.limit = 10;
    this.loadArticles();
  }

  loadMore() {
    this.limit += 10;
    this.loadArticles();
  }

  loadArticles() {
    this.articles$ =
      this.articleService.getFilteredArticles(this.activeRoute.queryParams.pipe(pluck('tag')), this.limit);
  }
}
