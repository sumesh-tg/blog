import { TestBed } from '@angular/core/testing';

import { PostPagenationService } from './post-pagenation.service';

describe('PostPagenationService', () => {
  let service: PostPagenationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostPagenationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
