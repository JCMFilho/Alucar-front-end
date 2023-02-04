import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endereco } from '../model/endereco.model';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private readonly urlBase: string = environment.urlBase + 'api/endereco';

  constructor(private http: HttpClient) {}

  getEnderecoByUserId(id: any): Observable<any> {
    return this.http.get<Endereco>(`${this.urlBase}/${id}`);
  }

  saveEndereco(endereco: Endereco): Observable<any> {
    return this.http.post(this.urlBase, endereco);
  }
}
