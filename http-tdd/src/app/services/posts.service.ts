import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map, of } from 'rxjs';
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
      switchMap((post) =>
        this.usersService.getUserById(post.userId).pipe(
          map((user) => {
            post.user = user;
            return post;
          })
        )
      )
    );
  }
}
