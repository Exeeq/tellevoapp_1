import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosrandomService {
  //DECLARACIÓN DE VARIABLES:
  user: any;
  emailValue?: string;
  passValue?: string;
  constructor(private httpsClient: HttpClient) { }

  //MÉTODO QUE OBTIENE UN USUARIO RANDOM DE LA API
  getRandomUser(): Observable<any>{
    return this.httpsClient.get('https://randomuser.me/api');
  }

  // MÉTODO QUE OBTIENE 10 USUARIOS ALEATORIOS DE LA API
  obtenerUsuariosComunes(): Observable<any[]> {
    // Realizamos 10 solicitudes a la API para obtener 10 usuarios aleatorios
    const requests = Array.from({ length: 10 }, () =>
      this.httpsClient.get('https://randomuser.me/api')
    );
  
    // Utilizamos forkJoin para combinar las respuestas de las 10 solicitudes
    return forkJoin(requests);
  }
  
  obtenerUsuariosConductores(): Observable<any[]> {
    // Realizamos 10 solicitudes a la API para obtener 10 usuarios aleatorios
    const requests = Array.from({ length: 10 }, () =>
      this.httpsClient.get('https://randomuser.me/api')
    );
  
    // Utilizamos forkJoin para combinar las respuestas de las 10 solicitudes
    return forkJoin(requests);
  }

  
}
