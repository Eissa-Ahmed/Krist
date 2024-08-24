import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../share/models/iresponse';
import { IApplicationSettings } from '../../share/models/iapplication-settings';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl: string = 'https://localhost:7218/';
  private version: string = 'v1';
  constructor(private http: HttpClient) { }

  getApplicationSettings(): Observable<IResponse<IApplicationSettings>> {
    return this.http.get<IResponse<IApplicationSettings>>(`${this.baseUrl}api/${this.version}/applicationsettings`);
  }
}
