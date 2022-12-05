import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostsService } from './posts.service';
import { EnvironmentService } from './environment.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpTestingController: HttpTestingController;
  const testApiUrl = 'https://test.com';

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
    service = TestBed.inject(PostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get api url from EnvironmentService', () => {
    expect(service.apiUrl).toBe(testApiUrl);
  });

  it('should return a list of posts', () => {
    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(1);
      expect(posts[0].id).toBe(3);
    });

    const dummyResponseData = [
      {
        userId: 1,
        id: 3,
        title: 'title',
        body: 'body',
      },
    ];

    const req = httpTestingController.expectOne(`${testApiUrl}/posts`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponseData);
  });

  it('should return a post by id', () => {
    service.getPostById(3).subscribe((post) => {
      expect(post.id).toBe(3);
    });

    const dummyResponseData = {
      userId: 1,
      id: 3,
      title: 'title',
      body: 'body',
    };

    const req = httpTestingController.expectOne(`${testApiUrl}/posts/3`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponseData);
  });
});
