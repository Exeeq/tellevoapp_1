import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IViajes } from 'src/app/interfaces/iviajes';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { ViajesService } from 'src/app/services/viajes.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';


@Component({
  selector: 'app-formulariocrearviaje',
  templateUrl: './formulariocrearviaje.page.html',
  styleUrls: ['./formulariocrearviaje.page.scss'],
})
export class FormularioCrearViajePage implements OnInit {

  viaje: IViajes = {
    conductor: '',
    imagen: '',
    lugarespera: '',
    lugardestino: '',
    patente: '',
    vehiculo: '',
    capacidad: 0,
    fecha: '',
    hora: '',
    conductorUid: '' // Asegúrate de que esta propiedad esté presente
  };
  user: any;
  constructor(
    private router: Router,
    private toastController: ToastController,
    private firestore: FirestoreService,
    private usuarioActualService: UsuarioActualService
    
  ) { }

  ngOnInit() {
    this.user = this.usuarioActualService.getCurrentUser();
    // Asignar el nombre del usuario al campo "conductor" del objeto "viaje"
    this.viaje.conductor = this.user.nombre;
  }

  volver() {
    this.router.navigate(['crearviaje']);
  }

  // Método que muestra mensajes en pantalla
  async mensajeToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  addViajeNormal() {
    // Asegúrate de tener el UID del conductor antes de llamar a la función
    this.viaje.conductorUid = this.user.uid; // Reemplaza con el UID real del conductor
    this.firestore.createDocument('viajes', this.viaje, this.user.uid);
    this.router.navigate(['viajes']);
  }

  cancelar() {
    this.router.navigate(["viajes"]);
  }

  addViaje() {
    // ALERTA QUE LE PREGUNTA AL USUARIO SI DESEA AGREGAR EL VIAJE
    Swal.fire({
      title: '¿Desea crear este viaje?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      // SI SE CONFIRMA SE MUESTRA LA ALERTA DE QUE SE AGREGÓ CON ÉXITO Y REDIRIGE AL VIAJES
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Viaje creado con éxito',
          heightAuto: false,
          showConfirmButton: false,
          timer: 1500
        });
        this.addViajeNormal();
      }
    });
  }

}
