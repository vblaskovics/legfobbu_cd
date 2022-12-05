import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PostsService } from './posts.service';
import { EnvironmentService } from './environment.service';
import { Post } from '../models/post';
import { tap, filter, skip } from 'rxjs';
import { UsersService } from './users.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpTestingController: HttpTestingController;
  const testApiUrl = 'https://test.com';
  let usersService:UsersService;

  beforeEach((done) => {
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
        }
      ],
    });
    service = TestBed.inject(PostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    usersService = TestBed.inject(UsersService);
    usersService.initUsers();
    usersService.getUsers().pipe(skip(1)).subscribe((users) => {
      expect(users.length).toBe(1);
      done();
    });

    const dummyResponseData = [
      {
        id: 1,
        name: 'John',
        username: 'johny',
        email: 'j',
      },
    ];
    let req = httpTestingController.expectOne(`${testApiUrl}/users`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponseData);
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

    service.getExpandedPost(dummyPost).subscribe(() => {
      expect(dummyPost.user?.name).toBe('John');
    });
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

    const req1 = httpTestingController.expectOne(`${testApiUrl}/posts/3`);
    req1.flush(dummyPostResponseData);
  });

  it('should return a list of posts with user data', (done) => {
    service.getPostsWithUsers().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts[0].user?.name).toBe('John');
      expect(posts[1].user?.name).toBe('John');
      done();
    });

    const dummyPostsResponseData = [
      {
        userId: 1,
        id: 3,
        title: 'title',
        body: 'body',
      },
      {
        userId: 1,
        id: 4,
        title: 'title',
        body: 'body',
      },
    ];

    const req1 = httpTestingController.expectOne(`${testApiUrl}/posts`);
    req1.flush(dummyPostsResponseData);
  });
});
