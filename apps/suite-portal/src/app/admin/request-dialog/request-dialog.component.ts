import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';

@Component({
  selector: 'sp-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css'],
})
export class RequestDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaintenanceRequest
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close({ ...this.data, isClosed: true });
  }
}
