import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { CanActivateAdminGuard } from './can-activate-admin.guard';
import { AuthService } from '../services/auth.service';
import { MOCK_AUTH_SERVICE } from '../services/__mocks__/service.mocks';
import { MOCK_ROUTER } from '../services/__mocks__/common.mocks';

describe('CanActivateAdminGuard', () => {
  let guard: CanActivateAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: MOCK_AUTH_SERVICE },
        { provide: Router, useValue: MOCK_ROUTER },
      ],
    });
    guard = TestBed.inject(CanActivateAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate()', () => {
    it('should call the authService to see if the user is authenticated', () => {
      const functionSpy = jest
        .spyOn(MOCK_AUTH_SERVICE, 'getIsAuthorized')
        .mockReturnValue(false);
      guard.canActivate(undefined, undefined);
      expect(functionSpy).toHaveBeenCalled();
    });
  });

  it('should navigate to the admin/login page if the user is not authenticated', () => {
    const expectedRoute = '/admin/login';

    jest.spyOn(MOCK_AUTH_SERVICE, 'getIsAuthorized').mockReturnValue(false);
    const functionSpy = jest.spyOn(MOCK_ROUTER, 'navigate');
    guard.canActivate(undefined, undefined);
    expect(functionSpy).toHaveBeenCalledWith(
      expect.arrayContaining([expectedRoute])
    );
  });
});
