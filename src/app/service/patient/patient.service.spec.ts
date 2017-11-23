import { TestBed, inject } from '@angular/core/testing';

import { PatientService } from './patient.service';
//import { PatientService } from './service/patient/patient.service';

describe('PatientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientService]
    });
  });

  it('should be created', inject([PatientService], (service: PatientService) => {
    expect(service).toBeTruthy();
  }));
});
