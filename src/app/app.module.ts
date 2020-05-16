import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './home/footer/footer.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import { TagcloudComponent } from './home/tagcloud/tagcloud.component';
import { RecentPostsComponent } from './home/recent-posts/recent-posts.component';
import { ArticlePreviewComponent } from './home/article-preview/article-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    TagcloudComponent,
    RecentPostsComponent,
    ArticlePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
