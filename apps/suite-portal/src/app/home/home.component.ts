import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ALL_SERVICE_TYPES,
  MaintenanceRequest,
} from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from '../services/maintenance-request.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;

  maintenanceRequestForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly maintenanceRequestService: MaintenanceRequestService
  ) {}

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

  onSubmit(): void {
    const req: MaintenanceRequest = this.maintenanceRequestForm.value;
    this.maintenanceRequestService.submitRequest(req);
  }
}
