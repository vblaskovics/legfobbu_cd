import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const testApiUrl = 'https://test.com';
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: EnvironmentService,
          useValue: {
            getApiUrl: () => {
              return testApiUrl;
            },
          },
        },
      ],
    });
    service = TestBed.inject(UsersService);
    // httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get api url from EnvironmentService', () => {
    expect(service.apiUrl).toBe(testApiUrl);
  });

  it('should return a list of users', () => {
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(1);
      expect(users[0].id).toBe(3);
    });

    const dummyResponseData = [{
      id: 3,
      name: 'John',
      username: 'johny',
      email: 'j@gmail.com',
    }];

    const req = httpTestingController.expectOne(`${testApiUrl}/users`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponseData);
  });

  it('should return a user by id', () => {
    const userId = 3;
    service.getUserById(userId).subscribe((user) => {
      expect(user.id).toBe(userId);
    });

    const dummyResponseData = {
      id: 3,
      name: 'John',
      username: 'johny',
      email: 'j@gmail.xom'
    };

    const req = httpTestingController.expectOne(`${testApiUrl}/users/${userId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponseData);
  });
});
