import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  private qrServerURL = 'https://api.qrserver.com/v1/create-qr-code/';

  constructor(private http: HttpClient) { }

  generateQRCodeForSolicitud(
    solicitudId: string,
    usuarioId: string,
    lugarEspera: string,
    lugarDestino: string,
    nombreUsuario: string,
    nombreConductor: string,
    size: string = '200x200'
  ): Observable<Blob> {
    const dataToEncode = `
      Solicitud ID: ${solicitudId},
      Usuario ID: ${usuarioId},
      Lugar Espera: ${lugarDestino},
      Lugar Destino: ${lugarEspera},
      Nombre Usuario: ${nombreUsuario},
      Nombre Conductor: ${nombreConductor}
    `;
    const url = `${this.qrServerURL}?data=${encodeURIComponent(dataToEncode)}&size=${size}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}


