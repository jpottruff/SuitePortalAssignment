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

  submitRequest(request: MaintenanceRequest): void {
    const url = `${this.API_ENDPOINT}`;
    // TODO -  handling
    this.http.post(url, request).subscribe((res) => console.log(res));
  }

  getRequestList(): Observable<MaintenanceRequest[]> {
    const url = `${this.API_ENDPOINT}`;
    return this.http.get<MaintenanceRequest[]>(url);
  }

  closeRequest(id: string): void {
    const url = `${this.API_ENDPOINT}/${id}/close`;
    // TODO - handling
    this.http.put(url, {}).subscribe((res) => console.log(res));
  }
}
