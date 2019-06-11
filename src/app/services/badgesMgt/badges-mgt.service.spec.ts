import { TestBed } from '@angular/core/testing';

import { BadgesMgtService } from './badges-mgt.service';

describe('BadgesMgtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BadgesMgtService = TestBed.get(BadgesMgtService);
    expect(service).toBeTruthy();
  });
});
