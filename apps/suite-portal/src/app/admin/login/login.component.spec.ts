import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../shared.module';
import { MOCK_AUTH_SERVICE } from '../../services/__mocks__/service.mocks';
import { LoginRequest } from '@suiteportal/api-interfaces';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: MOCK_AUTH_SERVICE },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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

  describe('onLogin()', () => {
    it('should call the authService with the forms value', () => {
      const mockFormValue: LoginRequest = {
        username: 'fakeuser',
        password: 'fake password',
      };

      const defaultForm = component.initializeForm();
      component.loginForm = defaultForm;
      component.loginForm.patchValue(mockFormValue);

      const functionSpy = jest.spyOn(MOCK_AUTH_SERVICE, 'login');
      component.onLogin();
      expect(functionSpy).toHaveBeenCalledWith(mockFormValue);
    });
  });
});
