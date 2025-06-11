import { TestBed } from '@angular/core/testing';

import { QuizConfigService } from './quiz-config.service';

describe('TestConfigService', () => {
  let service: QuizConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
