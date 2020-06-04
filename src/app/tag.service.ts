import { Injectable } from '@angular/core';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Tag {
  title: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {

  static getMax(tags: Tag[]) {
    return Math.max.apply( null, tags.map(tag => tag.count) );
  }

  static getMin(tags: Tag[]) {
    return Math.min.apply( null, tags.map(tag => tag.count) );
  }

  constructor(private articleService: ArticleService) { }

  getTags(): Observable<Tag[]> {
    return this.articleService.getAllArticles().pipe(map(articles => {
      const tags = [];
      articles.forEach(article => {
        if (!article.tags){
          return false;
        }
        article.tags.split(',').map(articleTag => articleTag.trim()).forEach(articleTag => {
          const tag = tags.find(ctag => ctag.title === articleTag);
          if (tag) {
            tag.count++;
          } else {
            tags.push({
              title: articleTag,
              count: 1
            });
          }
        });
      });
      return tags.filter(tag => tag.count > 3);
    }));
  }
}