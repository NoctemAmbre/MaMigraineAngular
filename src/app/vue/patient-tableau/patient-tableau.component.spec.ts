import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTableauComponent } from './patient-tableau.component';

describe('PatientTableauComponent', () => {
  let component: PatientTableauComponent;
  let fixture: ComponentFixture<PatientTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
