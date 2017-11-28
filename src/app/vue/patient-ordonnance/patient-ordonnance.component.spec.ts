import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOrdonnanceComponent } from './patient-ordonnance.component';

describe('PatientOrdonnanceComponent', () => {
  let component: PatientOrdonnanceComponent;
  let fixture: ComponentFixture<PatientOrdonnanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientOrdonnanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
