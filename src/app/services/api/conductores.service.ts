import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IConductores } from 'src/app/interfaces/iconductores';



@Injectable({
  providedIn: 'root'
})
export class ConductoresService {

  apiURL = "https://jsontellevoapp.onrender.com/conductores";
  constructor(private httpClient: HttpClient) { }

  listConductor(): Observable<IConductores[]> {
    return this.httpClient.get<IConductores[]>(`${this.apiURL}`);
  }
  
  

  addConductor(usuario: IConductores): Observable<IConductores> {
    return this.httpClient.post<IConductores>(`${this.apiURL}/`, usuario);
  }

  getConductor(id: number): Observable<IConductores[]> { 
    return this.httpClient.get<IConductores[]>(`${this.apiURL}/?id=${id}`); 
  }

  updateConductor(usuario: any): Observable<IConductores> {
    return this.httpClient.put<IConductores>(`${this.apiURL}/${usuario.id}`, usuario); 
  }

  deleteConductor(id: number): Observable<IConductores> {
    return this.httpClient.delete<IConductores>(`${this.apiURL}/${id}`);
  }

  validarCredencialesConductor(email: string, password: string) {
    return this.httpClient.get<IConductores[]>(`${this.apiURL}`).pipe(
      map((conductores: IConductores[]) => {
        if (conductores && conductores.length > 0) {
          const conductor = conductores.find((conductor) => conductor.results[0].email === email && conductor.results[0].login.password === password);
          return conductor; // Devuelve el objeto del conductor encontrado
        }
        return null; // Devuelve null si no se encuentra ningún conductor
      })
    );
}

  



  



}
