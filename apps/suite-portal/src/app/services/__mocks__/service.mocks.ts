import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { MaintenanceRequestService } from '../maintenance-request.service';

export const MOCK_MAINTENANCE_REQUEST_SERVICE: Partial<MaintenanceRequestService> = {
  getRequestList: jest.fn(),
};

export const MOCK_AUTH_SERVICE: Partial<AuthService> = {
  getIsAuthorized: jest.fn(),
  getAuthStatusListener: jest.fn().mockReturnValue(of(false)),
};
