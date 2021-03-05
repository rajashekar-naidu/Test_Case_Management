import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRunlogComponent } from './view-runlog.component';

describe('ViewRunlogComponent', () => {
  let component: ViewRunlogComponent;
  let fixture: ComponentFixture<ViewRunlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRunlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRunlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
