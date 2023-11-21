import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudviajeService {

  private apiURL = 'https://jsontellevoapp.onrender.com/solicitud-viajes';
  constructor(private httpClient: HttpClient) { }


  enviarSolicitudViaje(solicitudViaje: any) {
    // Envía la solicitud de viaje al backend
    return this.httpClient.post(`${this.apiURL}/`, solicitudViaje);
  }
}
