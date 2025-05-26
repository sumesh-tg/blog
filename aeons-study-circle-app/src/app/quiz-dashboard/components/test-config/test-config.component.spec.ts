import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConfigComponent } from './test-config.component';

describe('TestConfigComponent', () => {
  let component: TestConfigComponent;
  let fixture: ComponentFixture<TestConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
