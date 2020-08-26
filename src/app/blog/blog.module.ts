import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import { DisqusModule } from 'ngx-disqus';

import {ScullyLibModule} from '@scullyio/ng-lib';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, BlogRoutingModule, ScullyLibModule, DisqusModule],
})
export class BlogModule {}
