import { TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return environment', () => {
    expect(service.getEnvironment()).toBeTruthy();
  });

  it('should return api url', () => {
    expect(service.getApiUrl()).toBeTruthy();
  });
});
