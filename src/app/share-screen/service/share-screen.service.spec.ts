import { TestBed } from '@angular/core/testing';

import { ShareScreenService } from './share-screen.service';

describe('ShareScreenService', () => {
  let service: ShareScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
