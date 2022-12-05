import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  apiUrl: string = '';
  constructor(
    private environmentService: EnvironmentService,
    private httpClient: HttpClient
  ) {
    this.apiUrl = environmentService.getApiUrl();
  }

  getPosts(): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(`${this.apiUrl}/posts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiUrl}/posts/${id}`);
  }
}
