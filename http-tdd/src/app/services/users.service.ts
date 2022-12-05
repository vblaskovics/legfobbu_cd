import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = '';
  users$: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);

  constructor(
    private environmentService: EnvironmentService,
    private httpClient: HttpClient
  ) {
    this.apiUrl = environmentService.getApiUrl();
  }

  initUsers() {
    this.httpClient
      .get<Array<User>>(`${this.apiUrl}/users`)
      .subscribe((users) => {
        this.users$.next(users);
      });
  }

  getUsersValue(): Array<User> {
    return this.users$.getValue();
  }

  getUsers(): Observable<Array<User>> {
    return this.users$;
  }

  getUserById(id: number): Observable<User> {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.id === id)),
      map((user) => user ? user : {id:0, name: 'Not found', username: 'Not found', email: 'Not found'})
    );
  }
}
