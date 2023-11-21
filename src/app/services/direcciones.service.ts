import { Injectable } from '@angular/core';
import { Direccion } from '../pages/direcciones-guardadas/direcciones.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {
  direcciones: Direccion[] = [
    {
      id: '1',
      nombre: 'Dirección 1',
      comuna: 'Puente Alto',
      calle: 'Ernesto alvear',
      detalle: 'dejame en la entrada de la calle'

    },
    {
      id: '2',
      nombre: 'Dirección 2',
      comuna: 'Puente Alto',
      calle: 'Sargento Menadier',
      detalle: 'dejame en la esquina'

    },
    {
      id: '3',
      nombre: 'Dirección 3',
      comuna: 'Puente Alto',
      calle: 'Arturo prat',
      detalle: 'djema en la plaza'

    },
  ]
  constructor() { }


  getAll(){
    return[...this.direcciones]
  }

  getDireccion(id: string) {
    return {
      ...this.direcciones.find(aux => {
        return aux.id === id
      })
    }
  }

  addDireccion(nombre: any, comuna: any, calle: any, detalle: any) {
    this.direcciones.push({
      nombre, comuna, calle, detalle, id: this.direcciones.length + 1 + ""
    })
  }

  //Método que elimna el viaje por el id
  deleteDireccion(id: string ){
    this.direcciones = this.direcciones.filter( aux => {
      return aux.id !== id
    })
  }
}

