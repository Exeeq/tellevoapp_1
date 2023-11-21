// mapa.service.ts
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapaService {
  private map: L.Map | null = null;
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  createMap(elementId: string, center: [number, number], zoom: number): void {
    this.map = L.map(elementId).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map!);
  }

  addMarker(location: [number, number]): void {
    if (this.map) {
      L.marker(location).addTo(this.map);
    }
  }

  getCoordinatesFromLocation(location: string): Observable<[number, number] | null> {
    const params = {
      q: location,
      format: 'json',
    };

    return this.http.get<any[]>(this.nominatimUrl, { params }).pipe(
      map((response) => {
        if (response && response.length > 0) {
          const firstResult = response[0];
          return [parseFloat(firstResult.lat), parseFloat(firstResult.lon)] as [number, number];
        }
        return null;
      }),
      catchError((error) => {
        console.error('Error en la geocodificación:', error);
        return of(null);
      })
    );
  }

  addPolyline(coordinates: [number, number][]): void {
    if (this.map) {
      L.polyline(coordinates, { color: 'blue' }).addTo(this.map);
    }
  }

  
}
