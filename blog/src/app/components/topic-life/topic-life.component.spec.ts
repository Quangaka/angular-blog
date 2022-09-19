import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicLifeComponent } from './topic-life.component';

describe('TopicLifeComponent', () => {
  let component: TopicLifeComponent;
  let fixture: ComponentFixture<TopicLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicLifeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
