import { Injectable } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Article {
  route: string;
  title: string;
  description: string;
  published: boolean;
  date: string;
  tags: string;
}


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private scully: ScullyRoutesService) {}

  getArticles(): Observable<Article[]> {
    return this.scully.available$
      .pipe(map((articles: Article[]) => articles.filter((article: Article) => article.route !== '/')));
  }

  getFilteredArticles(tag$, limit = 10): Observable<Article[]> {
    return combineLatest([this.getArticles(), tag$]).pipe(
      map(([articles, tag]: [Article[], string]): Article[] => {
        return articles.filter((article) => {
          if (!tag) {
            return true;
          }
          else if (!article.tags) {
            return false;
          }
          return article.tags.includes(tag);
        });
      }),
      take(limit)
    );
  }
}