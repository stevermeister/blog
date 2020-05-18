import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tagcloud',
  templateUrl: './tagcloud.component.html',
  styleUrls: ['./tagcloud.component.css']
})
export class TagcloudComponent {

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
  ];

  calculateFontSize( count: number) {
    const maxSize = 22;
    const minSize = 8;
    const minCount = 4;
    const maxCount = 73;
    const fontStep = (maxSize - minSize) / (maxCount - minCount);
    return minSize + ( count - minCount ) * fontStep;
  }

}




function wp_generate_tag_cloud( tags ) {
  const options = {
    smallest                   : 8,
    largest                    : 22,
    unit                       : 'pt',
    number                     : 0,
    format                     : 'flat',
    separator                  : '\n',
    orderby                    : 'name',
    order                      : 'ASC',
    topic_count_text           : null,
    topic_count_text_callback  : null,
    topic_count_scale_callback : 'default_topic_count_scale',
    filter                     : 1,
    show_count                 : 0,
  };
}