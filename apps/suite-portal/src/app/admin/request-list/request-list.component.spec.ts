import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListComponent } from './request-list.component';
import { SharedModule } from '../../shared.module';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { MatDialog } from '@angular/material/dialog';
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
});
