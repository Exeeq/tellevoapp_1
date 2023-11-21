import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IViaje } from 'src/app/interfaces/iviaje';
import { IViajes } from 'src/app/interfaces/iviajes';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  apiURL = "https://jsontellevoapp.onrender.com";
  constructor(private httpClient: HttpClient) { }

  listViajes(): Observable<IViajes> {
    return this.httpClient.get<IViajes>(`${this.apiURL}/viajes`);
  }

  addViaje(viaje: IViaje): Observable<IViajes> {
    return this.httpClient.post<IViajes>(`${this.apiURL}/viajes`, viaje);
  }

  getViaje(id: number): Observable<IViaje[]> { 
    return this.httpClient.get<IViaje[]>(`${this.apiURL}/viajes/?id=${id}`); 
  }

  updateViaje(viaje: any): Observable<IViajes> {
    return this.httpClient.put<IViajes>(`${this.apiURL}/viajes/${viaje.id}`, viaje); 
  }

  deleteViaje(id: number): Observable<IViajes> {
    return this.httpClient.delete<IViajes>(`${this.apiURL}/viajes/${id}`);
  }
}