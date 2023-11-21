import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/api/viaje.service';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datail',
  templateUrl: './datail.page.html',
  styleUrls: ['./datail.page.scss'],
})
export class DatailPage implements OnInit {
  viajes = {
    id: 0,
    nombre: 'Goku',
    imagen: 'https://i.postimg.cc/ZRrSSn53/Captura-de-pantalla-2023-09-05-213431.png',
    lugar: 'duoc',
    patente: '123456',
    vehiculo: 'Volkswagen Golf',
    capacidad: 3,
    fecha: '31-10-2023',
    hora: '66:69'
  }
  user: any;
  direccionCasa: any;
  constructor(
    private apiService: ViajeService,
    private router: Router,
    private usuarioActualService: UsuarioActualService
  ) { }

  ngOnInit() {
    this.user = this.usuarioActualService.getCurrentUser();
  }

  ionViewWillEnter() {
    this.getViaje(this.getId())
  }


  getId(){
    let url = this.router.url;
    let aux = url.split("/", 3);
    let id = parseInt(aux[2]);
    console.log(id);
    return id;
  }


  getViaje(id: number){
    this.apiService.getViaje(id).subscribe((resp:any) => {
      this.viajes = {
        id: resp[0].id,
        nombre: resp[0].nombre,
        imagen: resp[0.].imagen,
        lugar: resp[0].lugar,
        patente: resp[0].patente,
        vehiculo: resp[0].vehiculo,
        capacidad: resp[0].capacidad,
        fecha: resp[0].fecha,
        hora: resp[0].hora,
      }
    })
  }

  deleteViaje() {
    //ALERTA QUE LE PREGUNTA AL USUARIO SI DESEA ELIMINAR EL VIAJE
    Swal.fire({
      title: '¿Está seguro que desea eliminar este viaje?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      //SI SE CONFIRMA SE MUESTRA LA ALERTA DE QUE SE ELIMINIMO CON EXITO Y REDIRIGE AL APIHOME
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Viaje eliminado con éxito',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        });
        this.apiService.deleteViaje(this.viajes.id).subscribe(() => {
          this.router.navigate(['/apihome']);
        });
      }
    });
  }

  redirectUpdate() {
    Swal.fire({
      title: '¿Desea modificar este viaje?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      //SI SE CONFIRMA SE MUESTRA LA ALERTA DE QUE SE ELIMINIMO CON EXITO Y REDIRIGE AL APIHOME
      if (result.isConfirmed) {
        this.router.navigate(['/apiupdate/', this.viajes.id])
      }
    });
  }

  tomarViaje() {
    Swal.fire({
      title: '¿Desea tomar este viaje?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      //SI SE TOMA EL VIAJE REDIRIGE AL USUARIO AL QR
      if (result.isConfirmed) {
        this.viajes.capacidad - 1
        this.router.navigate(['viajetomado']);

      }
    });
  }

  noTomar() {
    this.router.navigate(['apihome']);
  }
}
