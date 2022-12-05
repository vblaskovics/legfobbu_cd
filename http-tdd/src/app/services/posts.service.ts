import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map, of, combineLatest } from 'rxjs';
import { Post } from '../models/post';
import { UsersService } from './users.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  apiUrl: string = '';
  constructor(
    private environmentService: EnvironmentService,
    private httpClient: HttpClient,
    private usersService: UsersService
  ) {
    this.apiUrl = this.environmentService.getApiUrl();
  }

  getPosts(): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(`${this.apiUrl}/posts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  getPostWithUser(id: number): Observable<Post> {
    return this.getPostById(id).pipe(
      switchMap((post) => this.getExpandedPost(post))
    );
  }

  getExpandedPost(post: Post): Observable<Post> {
    return this.usersService.getUserById(post.userId).pipe(
      map((user) => {
        post.user = user;
        return post;
      })
    );
  }

  getPostsWithUsers(): Observable<Array<Post>> {
    return combineLatest([this.getPosts(), this.usersService.getUsers()]).pipe(
      map(([posts, users]) => this._getExpandedPostsFromUsers(posts, users))
    );
  }

  _getExpandedPostsFromUsers(posts: Array<Post>, users: Array<User>): Array<Post> {
    posts.forEach((post) => {
      post.user = users.find((user) => user.id === post.userId);
    });
    return posts;
  }
}
