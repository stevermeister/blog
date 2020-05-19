import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, ROUTES} from '@angular/router';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private router: Router, private route: ActivatedRoute, private scully: ScullyRoutesService) {
  }

  ngOnInit() {
    this.getCurrent().subscribe(article => this.article = article);
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
}
