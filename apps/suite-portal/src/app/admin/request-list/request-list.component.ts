import { Component, OnInit } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { Observable } from 'rxjs';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';

@Component({
  selector: 'sp-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
})
export class RequestListComponent implements OnInit {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
    public dialog: MatDialog
  ) {}
  requests$: Observable<MaintenanceRequest[]>;
  /** Controls order of displayed headings in table */
  displayedColumns: string[] = [
    'status',
    'serviceType',
    'unitNumber',
    'name',
    'email',
  ];

  ngOnInit(): void {
    this.requests$ = this.maintenanceRequestService.getRequestList();
  }

  openDialog(data: MaintenanceRequest) {
    const dialogRef = this.dialog.open(RequestDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result: MaintenanceRequest) => {
      if (result) {
        this.maintenanceRequestService.closeRequest(result.id).subscribe({
          next: (_res) =>
            (this.requests$ = this.maintenanceRequestService.getRequestList()),
          error: (err) => console.error(err),
        });
      }
    });
  }
}
