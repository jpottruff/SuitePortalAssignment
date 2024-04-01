import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  ALL_SERVICE_TYPES,
  MaintenanceRequest,
} from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from '../services/maintenance-request.service';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  @ViewChild(FormGroupDirective) formDirective;
  maintenanceRequestForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly maintenanceRequestService: MaintenanceRequestService,
    public dialog: MatDialog
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
    this.maintenanceRequestService.submitRequest(req).subscribe({
      next: () => this.openDialog(),
      error: (err) => console.error(err), // TODO - improve error handling
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SubmitDialogComponent);
    dialogRef.afterClosed().subscribe(() => this.formDirective.resetForm());
  }
}
