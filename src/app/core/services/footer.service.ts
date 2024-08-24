import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../share/models/iresponse';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private baseUrl: string = 'https://localhost:7218/';
  private version: string = 'v1';
  constructor(private http: HttpClient) { }

  userSubscription$(email: string): Observable<IResponse<null>> {
    return this.http.post<IResponse<null>>(`${this.baseUrl}api/${this.version}/users/subscription/${email}`, {});
  }
}
