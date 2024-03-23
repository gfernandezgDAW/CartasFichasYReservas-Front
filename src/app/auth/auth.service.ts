import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  authUrl = `${environment.apiUrl}auth`;
  constructor(private http: HttpClient) {}

  logIn(email: string, password: string) {
    return this.http.post(`${this.authUrl}/loginApp`, {
      email,
      password,
    });
  }

  signUp(username: string, email: string, dni: string, password: string) {
    return this.http.post(`${this.authUrl}/signUp`, {
      username,
      email,
      dni,
      password,
    });
  }
}
