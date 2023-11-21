import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IViajes } from 'src/app/interfaces/iviajes';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateviaje',
  templateUrl: './updateviaje.page.html',
  styleUrls: ['./updateviaje.page.scss'],
})
export class UpdateviajePage implements OnInit {

  viajes!: IViajes;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private firestore: FirestoreService) { }

  
  ngOnInit() {
    this.getViaje(this.getId())
  }

  getId(){
    let url = this.router.url;
    let aux = url.split("/", 3);
    let id = parseInt(aux[2]);
    return id; 
  }

  getViaje(id: number){
    const viajeId = this.activatedRoute.snapshot.paramMap.get('id');
  
    if (viajeId){
      this.firestore.getViajeById('viajes', viajeId).subscribe((viaje) => {
        if (viaje) {
          this.viajes = {
            conductorUid: viaje.conductorUid,
            id: viajeId,
            conductor: viaje.conductor,
            imagen: viaje.imagen,
            lugarespera: viaje.lugarespera,
            lugardestino: viaje.lugardestino,
            patente: viaje.patente,
            vehiculo: viaje.vehiculo,
            capacidad: viaje.capacidad,
            fecha: viaje.fecha,
            hora: viaje.hora
          };
        }
      });
    }
  }

  updateViajenormal(){
    const viajeId = this.activatedRoute.snapshot.paramMap.get('id');
    if(viajeId){
      this.firestore.updateDocument("viajes", viajeId, this.viajes);
      this.router.navigate(['viajes']);
    }
  }

  updateViaje() {
    //ALERTA QUE LE PREGUNTA AL USUARIO SI DESEA ELIMINAR EL VIAJE
    Swal.fire({
      title: '¿Está seguro que desea modificar este viaje?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      //SI SE CONFIRMA SE MUESTRA LA ALERTA DE QUE SE ELIMINIMO CON EXITO Y REDIRIGE AL APIHOME
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Viaje Modificado con éxito',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        });
        this.updateViajenormal();
        this.router.navigate(['viajes'])
        
      }
    });
  }
}
