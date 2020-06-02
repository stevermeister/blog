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
      return tags;
    }));
  }
}

/*
tags = [
  { title: 'Angular', count: 84},
  { title: 'browser', count: 6},
  { title: 'chrome', count: 16},
  { title: 'console', count: 11},
  { title: 'debug', count: 8},
  { title: 'design', count: 4},
  { title: 'event', count: 4},
  { title: 'facebook', count: 4},
  { title: 'fileapi', count: 4},
  { title: 'git', count: 14},
  { title: 'GitHub', count: 8},
  { title: 'google', count: 7},
  { title: 'grunt', count: 7},
  { title: 'html5', count: 6},
  { title: 'idea', count: 5},
  { title: 'javascript', count: 73},
  { title: 'jQuery', count: 14},
  { title: 'mac', count: 12},
  { title: 'MongoDB', count: 5},
  { title: 'mysql', count: 6},
  { title: 'node.js', count: 16},
  { title: 'npm', count: 5},
  { title: 'online', count: 45},
  { title: 'php', count: 8},
  { title: 'phpStorm', count: 4},
  { title: 'protractor', count: 4},
  { title: 'quiz', count: 5},
  { title: 'shell', count: 4},
  { title: 'skype', count: 6},
  { title: 'sql', count: 5},
  { title: 'terminal', count: 5},
  { title: 'tests', count: 5},
  { title: 'tool', count: 30},
  { title: 'ubuntu', count: 21},
  { title: 'webStorm', count: 9},
  { title: 'отзывы', count: 5},
  { title: 'собеседование', count: 6}
];*/
