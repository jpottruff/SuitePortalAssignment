import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDialogComponent } from './request-dialog.component';
import { SharedModule } from '../../shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaintenanceRequest, ServiceType } from '@suiteportal/api-interfaces';

const MOCK_DIALOG: Partial<MatDialogRef<any>> = {
  close: jest.fn(),
};

describe('RequestDialogComponent', () => {
  let component: RequestDialogComponent;
  let fixture: ComponentFixture<RequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [RequestDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: MOCK_DIALOG },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCancelCLick()', () => {
    it('should close the dialog', () => {
      const functionSpy = jest.spyOn(MOCK_DIALOG, 'close');
      component.onCancelClick();
      expect(functionSpy).toHaveBeenCalled();
    });
  });

  describe('onConfirmCLick()', () => {
    it('should close the dialog, and emit the data with isClosed: true', () => {
      const mockRequest: MaintenanceRequest = {
        name: 'Patti',
        email: 'patti@email.com',
        unitNumber: '123',
        serviceType: ServiceType.Electrical,
        summary: 'my request',
        details: 'further details',
      };

      const functionSpy = jest.spyOn(MOCK_DIALOG, 'close');
      component.data = mockRequest;
      component.onConfirmClick();
      expect(functionSpy).toHaveBeenCalledWith(
        expect.objectContaining({ isClosed: true })
      );
    });
  });
});
