import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ArticleService } from 'src/app/article.service';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit {
  articles$: Observable<any>;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articles$ =
      this.articleService.getArticles(20);
  }

}
