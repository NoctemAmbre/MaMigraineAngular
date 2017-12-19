import { TestBed, inject } from '@angular/core/testing';

import { FacteurService } from './facteur.service';

describe('FacteurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacteurService]
    });
  });

  it('should be created', inject([FacteurService], (service: FacteurService) => {
    expect(service).toBeTruthy();
  }));
});
