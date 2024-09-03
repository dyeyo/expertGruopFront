import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; 

import { IUser } from './../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());

  constructor(private http: HttpClient) {}

  register(user: IUser) {
    return this.http.post(`${environment.url}user/register/`, user).pipe(
      tap((data: any) => {
        this.setToken(data.token);
      })
    );
  }

  login(user: IUser) {
    return this.http.post(`${environment.url}user/login/`, user).pipe(
      tap((data: any) => {
        this.setToken(data.token);
      })
    );
  }

  getToken() {
    return localStorage.getItem('auth');
  }

  getTokenObservable() {
    return this.tokenSubject.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('auth', token);
    this.tokenSubject.next(token);
  }
}
