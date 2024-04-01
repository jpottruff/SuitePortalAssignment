import { MaintenanceRequestService } from '../maintenance-request.service';

export const MOCK_MAINTENANCE_REQUEST_SERVICE: Partial<MaintenanceRequestService> = {
  getRequestList: jest.fn(),
};
