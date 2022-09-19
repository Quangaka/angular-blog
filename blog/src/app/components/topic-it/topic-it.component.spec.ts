import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicITComponent } from './topic-it.component';

describe('TopicITComponent', () => {
  let component: TopicITComponent;
  let fixture: ComponentFixture<TopicITComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicITComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicITComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
