import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ALL_SERVICE_TYPES,
  MaintenanceRequest,
} from '@suiteportal/api-interfaces';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;

  maintenanceRequestForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    //
  }

  ngOnInit(): void {
    this.maintenanceRequestForm = this.initializeForm();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      unitNumber: ['', Validators.required],
      serviceType: ['', Validators.required],
      summary: ['', Validators.required],
      details: [''],
    });
  }

  onSubmit() {
    const req: MaintenanceRequest = this.maintenanceRequestForm.value;
    // TODO - send to api
    console.log(req);
  }
}
