import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '@suiteportal/api-interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthStatusListener().subscribe((isAuthorized) => {
      if (!isAuthorized) {
        // NOTE: reset() will cause Validators to be 'invalid' if the form has already submitted
        this.loginForm.reset();
      }
    });

    this.loginForm = this.initializeForm();
  }

  onLogin() {
    const req: LoginRequest = this.loginForm.value;
    this.authService.login(req);
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
