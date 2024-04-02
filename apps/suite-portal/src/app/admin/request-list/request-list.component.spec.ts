import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { SharedModule } from '../../shared.module';
import { RequestListComponent } from './request-list.component';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { MOCK_MAINTENANCE_REQUEST_SERVICE } from '../../services/__mocks__/service.mocks';

describe('RequestListComponent', () => {
  let component: RequestListComponent;
  let fixture: ComponentFixture<RequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [RequestListComponent],
      providers: [
        {
          provide: MaintenanceRequestService,
          useValue: MOCK_MAINTENANCE_REQUEST_SERVICE,
        },
        { provide: MatDialog, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call the maintenanceRequestService to hydrate the list data', () => {
      const functionSpy = jest
        .spyOn(MOCK_MAINTENANCE_REQUEST_SERVICE, 'getRequestList')
        .mockReturnValue(of([]));
      component.ngOnInit();
      expect(functionSpy).toHaveBeenCalled();
    });
  });

  describe('closeRequestAndRefresh()', () => {
    it('should call the maintenanceRequestService to close the request and refresh the list', () => {
      const mockId = '111';

      const closeSpy = jest
        .spyOn(MOCK_MAINTENANCE_REQUEST_SERVICE, 'closeRequest')
        .mockReturnValue(of({} as any));
      const refreshSpy = jest
        .spyOn(MOCK_MAINTENANCE_REQUEST_SERVICE, 'getRequestList')
        .mockReturnValue(of([] as any));

      component.closeRequestAndRefresh(mockId);
      expect(closeSpy).toHaveBeenCalledWith(mockId);
      expect(refreshSpy).toHaveBeenCalled();
    });
  });
});
