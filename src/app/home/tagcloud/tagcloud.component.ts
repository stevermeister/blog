import { Component, OnInit } from '@angular/core';
import { TagService, Tag } from 'src/app/tag.service';

@Component({
  selector: 'app-tagcloud',
  templateUrl: './tagcloud.component.html',
  styleUrls: ['./tagcloud.component.css']
})
export class TagcloudComponent implements OnInit{

  minSize = 8;
  maxSize = 22;
  minCount = 0;
  maxCount = 0;
  fontStep = 0;

  tags$ = this.tagService.getTags();

  constructor(private tagService: TagService) {

  }

  calculateFontSize( count: number) {
    return this.minSize + ( count - this.minCount ) * this.fontStep;
  }

  ngOnInit() {
    this.tags$.subscribe(tags => {
      this.minCount = TagService.getMin(tags);
      this.maxCount = TagService.getMax(tags);
      this.fontStep = (this.maxSize - this.minSize) / (this.maxCount - this.minCount);
    });
  }

}