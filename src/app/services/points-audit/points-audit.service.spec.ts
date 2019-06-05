import { TestBed } from '@angular/core/testing';

import { PointsAuditService } from './points-audit.service';

describe('PointsAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointsAuditService = TestBed.get(PointsAuditService);
    expect(service).toBeTruthy();
  });
});
