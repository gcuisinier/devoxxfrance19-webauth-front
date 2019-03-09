import { TestBed } from '@angular/core/testing';

import { WebauthNService } from './webauth-n.service';

describe('WebauthNService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebauthNService = TestBed.get(WebauthNService);
    expect(service).toBeTruthy();
  });
});
