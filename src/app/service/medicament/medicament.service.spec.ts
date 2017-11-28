import { TestBed, inject } from '@angular/core/testing';

import { MedicamentService } from './medicament.service';

describe('MedicamentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicamentService]
    });
  });

  it('should be created', inject([MedicamentService], (service: MedicamentService) => {
    expect(service).toBeTruthy();
  }));
});
