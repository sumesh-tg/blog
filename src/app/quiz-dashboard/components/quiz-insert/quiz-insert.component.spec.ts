import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInsertComponent } from './quiz-insert.component';

describe('QuizInsertComponent', () => {
  let component: QuizInsertComponent;
  let fixture: ComponentFixture<QuizInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
