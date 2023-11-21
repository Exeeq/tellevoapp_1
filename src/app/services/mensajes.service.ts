import { Injectable } from '@angular/core';
import { Mensaje } from '../pages/inbox/inbox.model';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  mensaje: Mensaje[] = [
    {
      id: '1',
      mensaje: 'aaa'
    }
  ]
  constructor() { }

  getAll(){
    return [...this.mensaje]
  }

  getMensaje(id: string){
    return {
      ...this.mensaje.find( aux => {
        return aux.id === id
      })
    }
  }

  addMensaje(mensaje: string) {
    this.mensaje.push({
      mensaje, id: this.mensaje.length + 1 + ""
    })
  }

  deleteMensaje(id: string) {
    this.mensaje = this.mensaje.filter(aux => {
      return aux.id === id
    })
  }

}