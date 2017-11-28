import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMesmigrainesComponent } from './patient-mesmigraines.component';

describe('MigraineMesmigrainesComponent', () => {
  let component: PatientMesmigrainesComponent;
  let fixture: ComponentFixture<PatientMesmigrainesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMesmigrainesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMesmigrainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
