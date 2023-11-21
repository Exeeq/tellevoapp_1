import { Injectable } from '@angular/core';
import { Registrarse } from '../pages/registrarse/registrarse.model';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  isLoggedIn: boolean = false;
  //Creación de la base de datos ficticia:
  registrarse: Registrarse[] = [
    {
      id: '1',
      nombre: 'Exequiel Albornoz',
      email: 'ex.albornoz@duocuc.cl',
      pass: 'exe12345',
    },
    {
      id: '2',
      nombre: 'Jeffrey Ramirez',
      email: 'jef.ramirez@duocuc.cl',
      pass: 'jeff12345',
    },
    {
      id: '3',
      nombre: 'Benjamin Ordenes',
      email: 'be.ordenes@duocuc.cl',
      pass: 'benja12345',
    },
  ]

  constructor() { }

  //Métodos custom:
  //-------------//

  //Método que devuelve usuario completo:
  obtenerTodo(){
    return [...this.registrarse]
  }

  //Método que devuelve un jugador filtrado por el id buscado
  obtenerUsuario(id: string){
    return {
      ...this.registrarse.find( aux => {
        return aux.id === id
      })
    }
  }

  //Método que registra un usuario:
  registrarUsuario(nombre: string, email: string, pass: string){
    this.registrarse.push({
      nombre, email, pass, id: (this.registrarse.length + 1).toString()
    })
  }

  // Método para obtener usuario por email
  obtenerCrendenciales(email: string) {
    return this.registrarse.find(aux => aux.email === email) || null;
  }

}
