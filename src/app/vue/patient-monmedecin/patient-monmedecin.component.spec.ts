import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientmonMedecinComponent } from './patient-monmedecin.component';

describe('PatientMondocteurComponent', () => {
  let component: PatientmonMedecinComponent;
  let fixture: ComponentFixture<PatientmonMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientmonMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientmonMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
