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
  sourceFile: string;
}


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private scully: ScullyRoutesService) {
    this.scully.available$.subscribe(data => console.log(data));
  }

  getAllArticles(): Observable<Article[]> {
    return this.getArticles(Number.MAX_SAFE_INTEGER);
  }

  getArticles(limit = 10): Observable<Article[]> {
    return this.scully.available$
      .pipe(
        map((articles: Article[]) => articles.filter((article: Article) =>
          article.sourceFile?.split('.').pop() === 'md')),
        map((articles: Article[]) => {
          return articles.sort((articleA, articleB) => {
            return +new Date(articleB.date) - +new Date(articleA.date);
          });
        }),
        map(articles => articles.slice(0, limit))
      );
  }

  getFilteredArticles(tag: string, searchTerm: string, limit: number = 10): Observable<Article[]> {
    return this.getAllArticles().pipe(
      map( (articles: Article[]) => {
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
      map(articles => articles.filter(article => {
        if (!searchTerm) {
          return true;
        }

        return article.title.includes(searchTerm) || article.tags.includes(searchTerm);
      })),
      map(articles => articles.slice(0, limit))
    );
  }
}
