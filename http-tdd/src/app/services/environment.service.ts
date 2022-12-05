import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor() {}

  getEnvironment() {
    return environment;
  }

  getApiUrl(): string {
    return environment.apiUrl;
  }
}
