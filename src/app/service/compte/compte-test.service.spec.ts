import { TestBed, inject } from '@angular/core/testing';

import { CompteTestService } from './compte-test.service';

describe('CompteTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompteTestService]
    });
  });

  it('should be created', inject([CompteTestService], (service: CompteTestService) => {
    expect(service).toBeTruthy();
  }));
});
