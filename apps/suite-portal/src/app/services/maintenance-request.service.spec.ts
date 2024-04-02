import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MaintenanceRequestService } from './maintenance-request.service';
import { HttpClient } from '@angular/common/http';
import { MOCK_HTTP_CLIENT } from './__mocks__/common.mocks';
import { of } from 'rxjs';
import { MaintenanceRequest, ServiceType } from '@suiteportal/api-interfaces';

describe('MaintenanceRequestService', () => {
  let service: MaintenanceRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient, useValue: MOCK_HTTP_CLIENT }],
    });
    service = TestBed.inject(MaintenanceRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submitRequest()', () => {
    const mockRequest: MaintenanceRequest = {
      name: 'Patti',
      email: 'patti@email.com',
      unitNumber: '123',
      serviceType: ServiceType.Electrical,
      summary: 'my request',
    };

    it('should POST a request to api/maintenance-requests', () => {
      const expectedEndpoint = 'api/maintenance-requests';
      const functionSpy = jest
        .spyOn(MOCK_HTTP_CLIENT, 'post')
        .mockReturnValue(of({}));
      service.submitRequest(mockRequest);
      expect(functionSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedEndpoint),
        expect.objectContaining(mockRequest)
      );
    });
  });

  describe('getRequestList()', () => {
    it('should GET an array of requests from api/maintenance-requests', () => {
      const expectedEndpoint = 'api/maintenance-requests';
      const functionSpy = jest
        .spyOn(MOCK_HTTP_CLIENT, 'get')
        .mockReturnValue(of([]));
      service.getRequestList();
      expect(functionSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedEndpoint)
      );
    });
  });

  describe('closeRequest()', () => {
    it('should PUT an array of requests from api/maintenance-requests', () => {
      const mockId = '111';
      const expectedEndpoint = `api/maintenance-requests/${mockId}/close`;
      const functionSpy = jest
        .spyOn(MOCK_HTTP_CLIENT, 'put')
        .mockReturnValue(of({}));
      service.closeRequest(mockId);
      expect(functionSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedEndpoint),
        expect.objectContaining({})
      );
    });
  });
});
