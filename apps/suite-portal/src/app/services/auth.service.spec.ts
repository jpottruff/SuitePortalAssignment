import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginResponse } from '@suiteportal/api-interfaces';
import { of, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { MOCK_HTTP_CLIENT, MOCK_ROUTER } from './__mocks__/common.mocks';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: MOCK_HTTP_CLIENT },
        { provide: Router, useValue: MOCK_ROUTER },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getIsAuthorized()', () => {
    it('should return false if the user is not authenticated', () => {
      const result = service.getIsAuthorized();
      expect(result).toBe(false);
    });
  });

  describe('login()', () => {
    const mockRequest = { username: 'test', password: 'test' };

    const mockSuccess: LoginResponse = {
      isAuthenticated: true,
      token: '111',
    };

    it('should send a post request to /api/user/login', () => {
      const expectedEndpoint = 'api/user/login';
      const functionSpy = jest
        .spyOn(MOCK_HTTP_CLIENT, 'post')
        .mockReturnValue(of({}));
      service.login(mockRequest);
      expect(functionSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedEndpoint),
        expect.objectContaining(mockRequest)
      );
    });

    it('should set the _token, _isAuthenticated, emit the next value on the _authStatusListener', () => {
      jest.spyOn(MOCK_HTTP_CLIENT, 'post').mockReturnValue(of(mockSuccess));
      const authListenerSpy = jest.spyOn(
        (service as any)._authStatusListener,
        'next'
      );

      service.login(mockRequest);
      expect(service.getIsAuthorized()).toBe(true);
      expect((service as any)._token).toBe(mockSuccess.token);
      expect(authListenerSpy).toHaveBeenCalledWith(true);
    });

    it('should navigate to the admin page if the user is authenticated', () => {
      const expectedRoute = '/admin';

      jest.spyOn(MOCK_HTTP_CLIENT, 'post').mockReturnValue(of(mockSuccess));
      const functionSpy = jest.spyOn(MOCK_ROUTER, 'navigate');
      service.login(mockRequest);
      expect(functionSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expectedRoute])
      );
    });

    it('should catch errors and set _isAuthenticated to false', () => {
      jest.spyOn(MOCK_HTTP_CLIENT, 'post').mockReturnValue(throwError('Error'));
      expect(service.getIsAuthorized()).toBe(false);
    });
  });

  describe('logout()', () => {
    it('should set the _token, _isAuthenticated to false and emit the next value on the _authStatusListener', () => {
      const authListenerSpy = jest.spyOn(
        (service as any)._authStatusListener,
        'next'
      );

      service.logout();
      expect(service.getIsAuthorized()).toBe(false);
      expect((service as any)._token).toBe(undefined);
      expect(authListenerSpy).toHaveBeenCalledWith(false);
    });
  });
});
