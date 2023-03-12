import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  login(login: string, senha: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Basic Y2xpZW50QWx1Y2FyOjEyM0A0NTY='
    );
    headers = headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=utf-8'
    );
    let params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', login);
    params.append('password', senha);
    return this.http.post(
      environment.urlBase + 'oauth/token',
      params.toString(),
      {
        headers: headers,
      }
    );
  }

  getUsuarioLogado() {
    const token = this.token();
    let decodedToken = null;
    if (token !== null && token !== undefined) {
      decodedToken = this.jwtHelperService.decodeToken(token);
    }
    return decodedToken;
  }

  logado(): boolean {
    return this.token() !== undefined && this.token() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    this.router.navigate(['home']);
  }

  token() {
    return localStorage.getItem('token');
  }

  armazenarToken(jwt: any) {
    localStorage.setItem('token', jwt.access_token);
  }

  recuperarUserId() {
    return localStorage.getItem('id');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_ADMIN';
  }
}
