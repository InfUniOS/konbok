import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalitiesComponent } from './penalities.component';

describe('PenalitiesComponent', () => {
  let component: PenalitiesComponent;
  let fixture: ComponentFixture<PenalitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenalitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
