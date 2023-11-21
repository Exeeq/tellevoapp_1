import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IViaje } from 'src/app/interfaces/iviaje';
import { ViajeService } from 'src/app/services/api/viaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  viaje: IViaje = {
    nombre: 'Goku',
    imagen: 'https://i.ytimg.com/vi/zjnz7Dikl5k/maxresdefault.jpg',
    lugar: 'Duoc',
    patente: 'GK-LO-62',
    vehiculo: 'Nube voladora',
    capacidad: '1',
    fecha: '12-10-2023',
    hora: '99:99'
  }

  constructor(private apiService: ViajeService,
              private router: Router ) { }

  ngOnInit() {
  }

  addViaje() {
    //ALERTA QUE LE PREGUNTA AL USUARIO SI DESEA AGREGAR EL VIAJE
    Swal.fire({
      title: '¿Desea crear este viaje?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      //SI SE CONFIRMA SE MUESTRA LA ALERTA DE QUE SE AGREGO CON EXITO Y REDIRIGE AL APIHOME
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Viaje creado con éxito',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        });
        this.apiService.addViaje(this.viaje).subscribe(() => {
          this.router.navigate(['/apihome']);
          
        });
      }
    });
  }


  

}
