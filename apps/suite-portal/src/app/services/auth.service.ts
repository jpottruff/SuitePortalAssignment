import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private _isAuthenticated = false;

  getIsAuthorized(): boolean {
    return this._isAuthenticated;
  }

  login() {
    // TODO
    this._isAuthenticated = true;
  }

  logout() {
    // TODO
    this._isAuthenticated = false;
  }
}
