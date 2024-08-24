import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IResponse } from '../../share/models/iresponse';
import { IAuthentication } from '../../share/models/iauthentication';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Register } from '../../share/models/Register';
import { User } from '../../share/models/User';
import { ResetPasswordModel } from '../../share/models/ResetPasswordModel';
import { IUser } from '../../share/models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7218/';
  private version: string = 'v1';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  login$(email: string, password: string): Observable<IResponse<IAuthentication>> {
    return this.http.post<IResponse<IAuthentication>>
      (this.baseUrl + `api/${this.version}/authentication/login`, { Email: email, Password: password });
  }

  register$(user: Register): Observable<IResponse<null>> {
    return this.http.post<IResponse<null>>
      (this.baseUrl + `api/${this.version}/authentication/register`, user);
  }

  getUser$(): Observable<IResponse<IUser>> {
    const userId = this.getUserInformationFromToken()?.id;
    return this.http.get<IResponse<IUser>>
      (this.baseUrl + `api/${this.version}/users/${userId}`);
  }

  getUserInformationFromToken(): User | undefined {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    const user = new User(
      decodedToken.Id,
      decodedToken.Email,
      decodedToken.UserName,
      decodedToken.Role
    )
    return user;
  }

  forgetPassword$(email: string): Observable<IResponse<null>> {
    return this.http.get<IResponse<null>>
      (this.baseUrl + `api/${this.version}/authentication/forget-password?email=${email}`);
  }

  resetPassword$(model: ResetPasswordModel): Observable<IResponse<null>> {
    return this.http.post<IResponse<null>>
      (this.baseUrl + `api/${this.version}/authentication/reset-password`, model);
  }

  tokenVerify$(token: string, email: string): Observable<IResponse<null>> {
    return this.http.post<IResponse<null>>
      (this.baseUrl + `api/${this.version}/authentication/token-verify`, { Email: email, Token: token }, { headers: { 'Content-Type': 'application/json' } });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
