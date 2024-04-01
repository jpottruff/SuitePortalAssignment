import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '@suiteportal/api-interfaces';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}
  private _isAuthenticated = false;
  private _token = undefined;
  private _authStatusListener = new Subject<boolean>();

  get API_ENDPOINT(): string {
    return `${environment.apiUrl}/user`;
  }

  getIsAuthorized(): boolean {
    // TBD - other permission logic could go here if needed
    return this._isAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this._authStatusListener.asObservable();
  }

  login(request: LoginRequest) {
    const url = `${this.API_ENDPOINT}/login`;
    this.http.post<LoginResponse>(url, request).subscribe({
      next: (res) => {
        this._token = res.token;
        this._isAuthenticated = res.isAuthenticated;
        this._authStatusListener.next(this.getIsAuthorized());

        if (this._token) {
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        console.error(err);
        this._authStatusListener.next(false);
      },
    });
    this._isAuthenticated = true;
  }

  logout() {
    // TODO
    this._isAuthenticated = false;
    this._token = undefined;
    this._authStatusListener.next(false);
  }
}
