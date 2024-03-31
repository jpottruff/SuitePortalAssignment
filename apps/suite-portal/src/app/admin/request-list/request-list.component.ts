import { Component, OnInit } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { Observable } from 'rxjs';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';

@Component({
  selector: 'sp-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
})
export class RequestListComponent implements OnInit {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService
  ) {}

  requests$: Observable<MaintenanceRequest[]>;
  ngOnInit(): void {
    this.requests$ = this.maintenanceRequestService.getRequestList();
  }
}
