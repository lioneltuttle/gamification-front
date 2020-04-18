import { TestBed, async, inject } from '@angular/core/testing';
import { UploadFileService } from './uploadFile.service';

describe('Service: UploadFile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadFileService]
    });
  });

  it('should ...', inject([UploadFileService], (service: UploadFileService) => {
    expect(service).toBeTruthy();
  }));
});
