// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { IViajes } from 'src/app/interfaces/iviajes';
// import { ViajeService } from 'src/app/services/api/viaje.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-update',
//   templateUrl: './update.page.html',
//   styleUrls: ['./update.page.scss'],
// })
// export class UpdatePage implements OnInit {

//   viaje: IViajes = {
//     nombre: '',
//     imagen: '',
//     lugar: '',
//     patente: '',
//     vehiculo: '',
//     capacidad: '',
//     fecha: '',
//     hora: ''
//   }
//   constructor(private apiService: ViajeService,
//               private router: Router) { }

//   ngOnInit() {
//     console.log(this.getId())
//   }

//   ionViewWillEnter(){
//     this.obtenerViaje(this.getId())
//   }

//   getId(){
//     let url = this.router.url
//     let aux = url.split("/",3)
//     let id = parseInt(aux[2])
//     return id
//   }

//   obtenerViaje(id: number) {
//     this.apiService.getViaje(id).subscribe((resp: any) => {
//       this.viaje = {
//         id: resp[0].id,
//         nombre: resp[0].nombre,
//         imagen: resp[0].imagen,
//         lugar: resp[0].lugar,
//         patente: resp[0].patente,
//         vehiculo: resp[0].vehiculo,
//         capacidad: resp[0].capacidad,
//         fecha: resp[0].fecha,
//         hora: resp[0].hora
//       }
//     })
//   }

//   updateViaje() {
//     //ALERTA QUE LE PREGUNTA AL USUARIO SI DESEA ELIMINAR EL VIAJE
//     Swal.fire({
//       title: '¿Está seguro que desea modificar este viaje?',
//       icon: 'warning',
//       showDenyButton: true,
//       confirmButtonText: 'Modificar',
//       denyButtonText: 'Cancelar',
//       heightAuto: false,
//     }).then((result) => {
//       //SI SE CONFIRMA SE MUESTRA LA ALERTA DE QUE SE ELIMINIMO CON EXITO Y REDIRIGE AL APIHOME
//       if (result.isConfirmed) {
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: 'Viaje Modificado con éxito',
//           heightAuto: false,
//           showConfirmButton: false,
//           timer: 1500
//         });
//         this.apiService.updateViaje(this.viaje).subscribe(() => {
//           this.router.navigate(['/apihome']);
//         });
//       }
//     });
//   }
  

// }
