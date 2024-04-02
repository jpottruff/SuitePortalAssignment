import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared.module';
import { MaintenanceRequestService } from '../services/maintenance-request.service';
import { MaintenanceRequest, ServiceType } from '@suiteportal/api-interfaces';
import { MOCK_MAINTENANCE_REQUEST_SERVICE } from '../services/__mocks__/service.mocks';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      declarations: [HomeComponent],
      providers: [
        FormBuilder,
        {
          provide: MaintenanceRequestService,
          useValue: MOCK_MAINTENANCE_REQUEST_SERVICE,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should initialize the form', () => {
      const functionSpy = jest.spyOn(component, 'initializeForm');
      component.ngOnInit();
      expect(functionSpy).toHaveBeenCalled();
    });
  });

  describe('onSubmit()', () => {
    it('should call the maintenanceRequestService with the forms value', () => {
      const mockFormValue: MaintenanceRequest = {
        name: 'Patti',
        email: 'patti@email.com',
        unitNumber: '123',
        serviceType: ServiceType.Electrical,
        summary: 'my request',
        details: 'further details',
      };

      const defaultForm = component.initializeForm();
      component.maintenanceRequestForm = defaultForm;
      component.maintenanceRequestForm.patchValue(mockFormValue);

      const functionSpy = jest.spyOn(
        MOCK_MAINTENANCE_REQUEST_SERVICE,
        'submitRequest'
      );
      component.onSubmit();
      expect(functionSpy).toHaveBeenCalledWith(mockFormValue);
    });
  });
});
