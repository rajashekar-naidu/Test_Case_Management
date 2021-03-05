import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestcaseComponent } from './view-testcase.component';

describe('ViewTestcaseComponent', () => {
  let component: ViewTestcaseComponent;
  let fixture: ComponentFixture<ViewTestcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTestcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
