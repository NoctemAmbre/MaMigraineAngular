import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFacteursComponent } from './patient-facteurs.component';

describe('PatientFacteursComponent', () => {
  let component: PatientFacteursComponent;
  let fixture: ComponentFixture<PatientFacteursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFacteursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFacteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
