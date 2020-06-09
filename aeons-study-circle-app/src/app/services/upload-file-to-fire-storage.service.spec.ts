import { TestBed } from '@angular/core/testing';

import { UploadFileToFireStorageService } from './upload-file-to-fire-storage.service';

describe('UploadFileToFireStorageService', () => {
  let service: UploadFileToFireStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadFileToFireStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
