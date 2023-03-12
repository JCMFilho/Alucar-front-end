import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Avaliacao } from '../model/avaliacao.model';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  private readonly urlBase: string = environment.urlBase + 'api/avaliacao';

  constructor(private http: HttpClient) {}

  avaliar(avaliacao: Avaliacao): Observable<any> {
    return this.http.post(this.urlBase, avaliacao);
  }

  buscarAvaliacoesPorVeiculo(vehicleId: Number): Observable<any> {
    return this.http.get(`${this.urlBase}/${vehicleId}`);
  }
}
