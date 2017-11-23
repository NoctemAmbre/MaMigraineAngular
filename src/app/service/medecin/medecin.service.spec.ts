import { TestBed, inject } from '@angular/core/testing';

import { MedecinService } from './medecin.service';

describe('MedecinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedecinService]
    });
  });

  it('should be created', inject([MedecinService], (service: MedecinService) => {
    expect(service).toBeTruthy();
  }));
});
