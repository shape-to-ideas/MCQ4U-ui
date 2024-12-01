import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptQuestionsComponent } from './attempt-questions.component';

describe('AttemptQuestionsComponent', () => {
  let component: AttemptQuestionsComponent;
  let fixture: ComponentFixture<AttemptQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttemptQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttemptQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
