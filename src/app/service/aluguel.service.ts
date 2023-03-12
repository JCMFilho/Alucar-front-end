import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aluguel } from '../model/aluguel.model';

@Injectable({
  providedIn: 'root',
})
export class AluguelService {
  private readonly urlBase: string = environment.urlBase + 'api/alugueis';

  constructor(private http: HttpClient) {}

  salvarAluguel(aluguel: Aluguel): Observable<any> {
    return this.http.post(this.urlBase, aluguel);
  }
  cancelarAluguel(id: any): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  concluirAluguel(id: any): Observable<any> {
    return this.http.delete(`${this.urlBase}/concluir/${id}`);
  }

  buscarAlugueisDoUsuario(id: any): Observable<any> {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  buscarAlugueisPorFiltro(filtro: any): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/filter`, { params: filtro });
  }
}
