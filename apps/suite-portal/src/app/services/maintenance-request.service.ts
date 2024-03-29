import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestService {
  constructor(private readonly http: HttpClient) {}

  get API_ENDPOINT(): string {
    return `${environment.apiUrl}/maintenance-requests`;
  }

  submitRequest(request: MaintenanceRequest) {
    const url = `${this.API_ENDPOINT}/maintenance-requests`;
    console.log(url, request);
    // TODO - hook up backend
    // this.http.post(url, request);
  }
}
