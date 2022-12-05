import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = "";
  users$: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);

  constructor(private environmentService: EnvironmentService, private httpClient: HttpClient) {
    this.apiUrl = environmentService.getApiUrl();
  }

  initUsers() {
    this.httpClient.get<Array<User>>(`${this.apiUrl}/users`).pipe(
      tap((users) => console.log('Users fetched', users))
    ).
    subscribe((users) => {
      this.users$.next(users);
    });
  }

  getUsers(): Observable<Array<User>> {
    return this.users$;
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`)
  }
}
