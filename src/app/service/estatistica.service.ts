import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstatisticaService {
  private readonly urlBase: string = environment.urlBase + 'api/estatistica';

  constructor(private http: HttpClient) {}

  buscarEstatisticas(): Observable<any> {
    return this.http.get(`${this.urlBase}`);
  }
}
