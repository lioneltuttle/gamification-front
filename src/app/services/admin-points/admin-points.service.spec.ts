import { TestBed } from '@angular/core/testing';

import { AdminPointsService } from './admin-points.service';

describe('AdminPointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPointsService = TestBed.get(AdminPointsService);
    expect(service).toBeTruthy();
  });
});