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

  private googleDirectionsUrl = 'https://maps.googleapis.com/maps/api/directions/json';

  constructor(private http: HttpClient) {}

  createMap(elementId: string, center: [number, number], zoom: number): void {
    this.clearMap();  // Limpia el mapa antes de crear uno nuevo
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

  clearMap(): void {
    if (this.map) {
      this.map.eachLayer((layer) => {
        layer.remove();
      });
    }
  }

  getRoute(start: string, end: string): Observable<[number, number][]> {
    const osrmBaseUrl = 'https://router.project-osrm.org/route/v1/driving/';
  
    const url = `${osrmBaseUrl}${start.split(' ').join('+')};${end.split(' ').join('+')}?geometries=geojson`;
  
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response && response.routes && response.routes.length > 0) {
          const route = response.routes[0].geometry.coordinates;
          return route.map((coords: number[]) => [coords[1], coords[0]]) as [number, number][];
        }
        return [];
      }),
      catchError((error) => {
        console.error('Error al obtener la ruta:', error);
        return of([]);
      })
    );
  }

  // Método para decodificar la polyline y obtener las coordenadas
  private decodePolyline(encoded: string): [number, number][] {
    const len = encoded.length;
    let index = 0;
    let lat = 0;
    let lng = 0;
    const coordinates: [number, number][] = [];

    while (index < len) {
      let shift = 0;
      let result = 0;
      let byte;

      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += deltaLat;

      shift = 0;
      result = 0;

      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      const deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += deltaLng;

      coordinates.push([lat / 1e5, lng / 1e5]);
    }

    return coordinates;
  }
}
