import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestService {
  constructor(private readonly http: HttpClient) {}

  get API_ENDPOINT(): string {
    return `${environment.apiUrl}/maintenance-requests`;
  }

  submitRequest(request: MaintenanceRequest) {
    const url = `${this.API_ENDPOINT}`;
    this.http.post(url, request).subscribe((res) => {
      // TODO -  handling
      console.log(res);
    });
  }

  getRequestList(): Observable<MaintenanceRequest[]> {
    const url = `${this.API_ENDPOINT}`;
    return this.http.get<MaintenanceRequest[]>(url);
  }
}
