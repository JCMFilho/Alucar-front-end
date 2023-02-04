import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../model/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly urlBase: string = environment.urlBase + 'api/vehicle';

  constructor(private http: HttpClient) {}

  getVehicleHomePage(): Observable<any> {
    return this.http.get<any>(this.urlBase);
  }

  getVehicleList(filtro: any): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/filter`, { params: filtro });
  }

  getVehicleById(id: number): Observable<any> {
    return this.http.get<Vehicle>(`${this.urlBase}/${id}`);
  }

  saveVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(this.urlBase, vehicle);
  }

  deleteVehicle(vehicleId: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${vehicleId}`);
  }
}
