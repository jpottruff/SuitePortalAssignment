import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanActivateAdminGuard } from './can-activate-admin.guard';
import { AuthService } from '../services/auth.service';

describe('CanActivateAdminGuard', () => {
  let guard: CanActivateAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: {} }],
    });
    guard = TestBed.inject(CanActivateAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
