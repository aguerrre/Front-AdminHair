import { Injectable, NgZone } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, Observable, tap, of } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

const base_url = `${environment.base_url}/auth`;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: User;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }
  get uid(): string {
    return this.user.uid || '';
  }
  private saveTokenLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/renew`, this.headers).pipe(
      tap((resp: any) => {
        const { name, email, img, google_auth, is_confirmed, uid } = resp.user;
        this.user = new User(name, email, '', img, google_auth, is_confirmed, uid);
        this.saveTokenLocalStorage(resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  create(formData: RegisterForm) {
    return this.http.post(`${base_url}/register`, formData);
  }

  verify(token: string) {
    return this.http.put(`${base_url}/verify/${token}`, token);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.saveTokenLocalStorage(resp.token);
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/google`, { token })
      .pipe(
        tap((resp: any) => {
          this.saveTokenLocalStorage(resp.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    if (!this.user.google_auth) {
      this.router.navigateByUrl('/inicio-sesion');
    } else {
      google.accounts.id.revoke(this.user.email, () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/inicio-sesion');
        })
      });
    }
  }

}

