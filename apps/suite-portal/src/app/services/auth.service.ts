import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly router: Router) {}
  private _isAuthenticated = false;

  getIsAuthorized(): boolean {
    return this._isAuthenticated;
  }

  login() {
    // TODO
    this._isAuthenticated = true;
    this.router.navigate(['/admin']);
  }

  logout() {
    // TODO
    this._isAuthenticated = false;
  }
}
