import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagcloudComponent } from './tagcloud.component';

describe('TagcloudComponent', () => {
  let component: TagcloudComponent;
  let fixture: ComponentFixture<TagcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
