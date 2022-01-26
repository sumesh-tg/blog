import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSidebarComponent } from './ad-sidebar.component';

describe('AdSidebarComponent', () => {
  let component: AdSidebarComponent;
  let fixture: ComponentFixture<AdSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
