import { TestBed, inject } from '@angular/core/testing';

import { AdministrateurService } from './administrateur.service';

describe('AdministrateurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrateurService]
    });
  });

  it('should be created', inject([AdministrateurService], (service: AdministrateurService) => {
    expect(service).toBeTruthy();
  }));
});
