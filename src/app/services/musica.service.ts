import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  apiKey = '2f8eece42bfef5a4aaff2f57835f4d2c';
  apiUrl = 'http://ws.audioscrobbler.com/2.0/';

  constructor(private http: HttpClient) { }

  searchSongs(query: string): Observable<any> {
    const method = 'track.search';
    const params = `?method=${method}&track=${query}&api_key=${this.apiKey}&format=json`;
    const url = this.apiUrl + params;

    return this.http.get(url);
  }
}
