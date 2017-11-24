import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCourbesComponent } from './patient-courbes.component';

describe('PatientCourbesComponent', () => {
  let component: PatientCourbesComponent;
  let fixture: ComponentFixture<PatientCourbesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCourbesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCourbesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
