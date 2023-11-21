import { Injectable } from '@angular/core';
import { Viajes } from '../pages/viajes/viajes.model';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  viajes: Viajes[] = [
    {
      id: '1',
      nombre: 'Tulio Japia',
      imagen: 'https://i.postimg.cc/ZRrSSn53/Captura-de-pantalla-2023-09-05-213431.png',
      lugar: 'Pajarito1234',
      patente: 'XJXW20',
      vehiculo: 'Nissan V16',
      capacidad: '4',
      fecha: '31/08/2023',
      hora: '12:23',
    },
    {
      id: '2',
      nombre: 'Galan Ajardo',
      imagen: 'https://media.licdn.com/dms/image/D4E03AQGoAVRKWG1c_A/profile-displayphoto-shrink_800_800/0/1673410421864?e=2147483647&v=beta&t=eU_NqEC9LMdvNwN-U9gI4wPjNzG6F1wLrdSeywQaa1g',
      lugar: 'Plaza Puente Alto 4321',
      patente: 'JDEA02',
      vehiculo: 'Mini cooper',
      capacidad: '2',
      fecha: '31/08/2023',
      hora: '13:23',
    },
    {
      id: '3',
      nombre: 'Mavel Porales',
      imagen: 'https://pbs.twimg.com/profile_images/1396888424595009539/M1XX8rxH_400x400.jpg',
      lugar: 'Plaza Alola 6544',
      patente: 'QRJA63',
      vehiculo: 'Nissan X-Trail',
      capacidad: '5',
      fecha: '31/08/2023',
      hora: '13:30',
    },
    {
      id: '4',
      nombre: 'Juan',
      imagen: 'https://media.discordapp.net/attachments/1084894385629581358/1122601621969440909/image.png',
      lugar: 'Plaza Juan',
      patente: 'JUAN11',
      vehiculo: 'CALLABO',
      capacidad: '100',
      fecha: '31/08/2023',
      hora: '11:11',
    },
  ]

  constructor() { }
  // MÉTODOS CUSTOM

  //Método que devuelve objeto completo
  getAll() {
    return [...this.viajes]
  }

  //Método que devuelve un viaje filtrado por el id buscado
  getViaje(id: string) {
    return {
      ...this.viajes.find( aux => {
        return aux.id === id
      }

      )
    }
  }

  //Método que agrega un viaje
  addViaje(lugar: any, patente: any, vehiculo: any, capacidad: any, fecha: any, hora: any) {
    this.viajes.push({
       lugar, patente, vehiculo, capacidad, fecha, hora, id: this.viajes.length + 1 + ""
    })
  }

  //Método que elimna el viaje por el id
  deleteViaje(id: string ){
    this.viajes = this.viajes.filter( aux => {
      return aux.id !== id
    })
  }

}
