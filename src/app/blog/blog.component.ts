import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, ROUTES, NavigationEnd} from '@angular/router';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Observable, of, merge } from 'rxjs';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Article } from '../article.service';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent implements OnInit {
  article;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scully: ScullyRoutesService,
    private titleService: Title) {
  }

  ngOnInit() {
    // this.scully.getCurrent().subscribe(article => this.article = article);
    const stateUpdated$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    merge(stateUpdated$, of(true)).pipe(switchMap(_ => this.getCurrent()))
    .subscribe(article => {
      this.titleService.setTitle(article.title + '| Stepan Suvorov Blog | Release 3.0');
      this.article = article;
    });
  }

  getCurrent(): Observable<ScullyRoute> {
    if (!location) {
      /** probably not in a browser, no current location available */
      return of();
    }
    const curLocation = decodeURI(location.pathname).trim();
    return this.scully.available$.pipe(
      map(list =>
        list.find(
          r =>
            curLocation === r.route.trim() ||
            (r.slugs &&
              Array.isArray(r.slugs) &&
              r.slugs.find(slug => curLocation.endsWith(slug.trim())))
        )
      )
    );
  }

  getArticleEditLink(article: Article): string {
    return 'https://github.com/stevermeister/blog/edit/master' + article.route + '.md';
  }
}
