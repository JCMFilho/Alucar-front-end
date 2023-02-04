import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../model/user-entity.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly urlBase: string = environment.urlBase + 'api/user';

  constructor(private http: HttpClient) {}

  searchUserByEmail(email: any): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/${email}`);
  }

  saveUser(user: UserEntity): Observable<any> {
    return this.http.post(this.urlBase, user);
  }

  updateUser(user: UserEntity): Observable<any> {
    return this.http.put(this.urlBase, user);
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post(this.urlBase + '/recover', email);
  }
  changePassword(email: string, senha: string): Observable<any> {
    return this.http.post(this.urlBase + '/change-password', null, {
      params: { email: email, senha: senha },
    });
  }
}
