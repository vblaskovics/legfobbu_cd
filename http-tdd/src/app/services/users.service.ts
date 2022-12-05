import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = "";

  constructor(private environmentService: EnvironmentService, private httpClient: HttpClient) {
    this.apiUrl = environmentService.getApiUrl();
  }

  getUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.apiUrl}/users`)
  }
}
