import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { IUsuarios } from 'src/app/interfaces/iusuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'https://jsontellevoapp.onrender.com/Usuarios';
  constructor(private httpClient: HttpClient) { }

  listUsuarios(): Observable<IUsuarios[]> {
    return this.httpClient.get<IUsuarios[]>(`${this.apiUrl}`);
  }

  addUsuario(usuario: IUsuarios): Observable<IUsuarios> {
    return this.httpClient.post<IUsuarios>(`${this.apiUrl}`, usuario);
  }

  getUsuario(id: number): Observable<IUsuarios[]> { 
    return this.httpClient.get<IUsuarios[]>(`${this.apiUrl}/?id=${id}`); 
  }

  updateUsuario(usuario: any): Observable<IUsuarios> {
    return this.httpClient.put<IUsuarios>(`${this.apiUrl}/${usuario.id}`, usuario); 
  }
  
  deleteUsuario(id: number): Observable<IUsuarios> {
    return this.httpClient.delete<IUsuarios>(`${this.apiUrl}/${id}`);
  }

  validarCredencialesUsuario(email: string, password: string) {
    return this.httpClient.get<IUsuarios[]>(`${this.apiUrl}`).pipe(
      map((usuarios: IUsuarios[]) => {
        if (usuarios && usuarios.length > 0) {
          const usuario = usuarios.find((usuario) => usuario.results[0].email === email && usuario.results[0].login.password === password);
          return usuario; // Devuelve el objeto del conductor encontrado
        }
        return null; // Devuelve null si no se encuentra ningún conductor
      })
    );
}

  
  

}