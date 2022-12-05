import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PostsService } from './posts.service';
import { EnvironmentService } from './environment.service';
import { Post } from '../models/post';

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

  it('should expand a post with user data', () => {
    let dummyPost: Post = {
      id: 3,
      title: 'title',
      body: 'body',
      userId: 1,
    };

    let dummyUser = {
      id: 1,
      name: 'John',
      username: 'johny',
      email: 'j',
    };

    service.getExpandedPost(dummyPost).subscribe(() => {
      expect(dummyPost.user?.name).toBe('John');
    });

    const req = httpTestingController.expectOne(`${testApiUrl}/users/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyUser);
  });

  it('should return a post with user data', () => {
    service.getPostWithUser(3).subscribe((post) => {
      expect(post.id).toBe(3);
      expect(post.user?.id).toBe(1);
    });

    const dummyPostResponseData = {
      userId: 1,
      id: 3,
      title: 'title',
      body: 'body',
    };

    const dummyUserResponseData = {
      id: 1,
      name: 'John',
      username: 'johny',
      email: 'j@gmail.com',
    };

    const req1 = httpTestingController.expectOne(`${testApiUrl}/posts/3`);
    req1.flush(dummyPostResponseData);
    const req2 = httpTestingController.expectOne(`${testApiUrl}/users/1`);
    req2.flush(dummyUserResponseData);
  });

  it('should return a list of posts with user data', () => {
    service.getPostsWithUsers().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts[0].user?.name).toBe('John');
      expect(posts[1].user?.name).toBe('Bill');
    });

    const dummyPostsResponseData = [
      {
        userId: 1,
        id: 3,
        title: 'title',
        body: 'body',
      },
      {
        userId: 2,
        id: 4,
        title: 'title',
        body: 'body',
      },
    ];

    const dummyUsersResponseData = [
      {
        id: 1,
        name: 'John',
        username: 'johny',
        email: 'j',
      },
      {
        id: 2,
        name: 'Bill',
        username: 'billy',
        email: 'b',
      },
    ];

    const req1 = httpTestingController.expectOne(`${testApiUrl}/posts`);
    req1.flush(dummyPostsResponseData);
    const req2 = httpTestingController.expectOne(`${testApiUrl}/users`);
    req2.flush(dummyUsersResponseData);
  });
});
