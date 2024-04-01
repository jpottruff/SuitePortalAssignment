import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '@suiteportal/api-interfaces';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (paramMap: ParamMap) => {
        if (paramMap.has('authFailed')) {
          this.loginForm = this.initializeForm();
        }
      },
      error: (err) => console.error(err),
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
