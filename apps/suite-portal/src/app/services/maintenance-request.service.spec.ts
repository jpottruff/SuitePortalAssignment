import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MaintenanceRequestService } from './maintenance-request.service';

describe('MaintenanceRequestService', () => {
  let service: MaintenanceRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MaintenanceRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
