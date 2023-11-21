import { Component, NgModule, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import Swal from 'sweetalert2';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';
import { SolicitudesService } from 'src/app/services/firebase/solicitudes.service';
import { SolicitudViaje } from 'src/app/interfaces/isolicitudviajes';
import { Location } from '@angular/common';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-detalleviaje',
  templateUrl: './detalleviaje.page.html',
  styleUrls: ['./detalleviaje.page.scss'],
})

export class DetalleviajePage implements OnInit {
  viajes = {
    id: '0',
    conductor: '',
    imagen: '',
    lugarespera: '',
    lugardestino: '',
    patente: '',
    vehiculo: '',
    capacidad: 0,
    fecha: '',
    hora: '',
    conductorUid: ''
  }

  solicitudEnviada = false;
  user: any;
  solicitudPendiente = false;
  solicitudes: SolicitudViaje[] = [];

  constructor(private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private firestore: FirestoreService,
    private activatedRoute: ActivatedRoute,
    private usuarioActualService: UsuarioActualService,
    private solicitudesService: SolicitudesService,
    private zone: NgZone,) { }

    ngOnInit() {
      this.user = this.usuarioActualService.getCurrentUser();
      this.getViaje(this.getId());
      this.revisarSolicitudesAceptadas();
      this.resetSolicitudEnviada();
      this.solicitudEnviada = this.usuarioActualService.getSolicitudEnviada();
      this.solicitudPendiente = this.usuarioActualService.getSolicitudPendiente();
    }

    async mensajeToast(mensaje: string){
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 2000,
        position: 'bottom'
      })
      toast.present()
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
              id: viajeId,
              conductor: viaje.conductor,
              imagen: viaje.imagen,
              lugarespera: viaje.lugarespera,
              lugardestino: viaje.lugardestino,
              patente: viaje.patente,
              vehiculo: viaje.vehiculo,
              capacidad: viaje.capacidad,
              fecha: viaje.fecha,
              hora: viaje.hora,
              conductorUid: viaje.conductorUid
            };
          }
        });
      }
    }
    

    deleteViajenormal() {
      const viajeId = this.activatedRoute.snapshot.paramMap.get('id');
      if(viajeId){
        this.firestore.deleteDocument('viajes', viajeId);
        this.router.navigate(['viajes'])
      }
    }




    redirigirUsuarioAPaginaQR() {
      this.router.navigate(['qr']);
    }

    async tomarViaje() {
      // Verificar si la solicitud ya se ha enviado
      if (this.solicitudEnviada) {
        // Mostrar un mensaje o realizar acciones adicionales si es necesario
        console.log('La solicitud ya ha sido enviada.');
        return;
      }
  
      const solicitud = {
        conductorUid: this.viajes.conductorUid,
        usuariouId: this.user.uid,
        viajeId: this.viajes.id,
        estado: 'pendiente',
        nombreusuario: this.user.nombre,
        nombreconductor: this.viajes.conductor,
        lugarespera: this.viajes.lugarespera,
        lugardestino: this.viajes.lugardestino,
      };
  
      this.solicitudEnviada = true; // Marcar la solicitud como enviada antes de enviarla
      this.usuarioActualService.setSolicitudEnviada(true);
  
      this.solicitudesService.enviarSolicitudConObservador(solicitud)
        .subscribe(
          (solicitud: SolicitudViaje) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Solicitud enviada al conductor, espere mientras la revisa.",
              showConfirmButton: false,
              timer: 2500,
              heightAuto: false,
            });
  
            // Restablecer solicitudPendiente a false después de enviar la solicitud
            this.solicitudPendiente = false;
            this.usuarioActualService.setSolicitudPendiente(false);
          },
          (error) => {
            console.error('Error al enviar la solicitud:', error);
            // Restablecer solicitudPendiente a false en caso de error
            this.solicitudPendiente = false;
            this.usuarioActualService.setSolicitudPendiente(false);
          }
        );
    }
    
  
    private revisarSolicitudesAceptadas() {
      const usuarioId = this.user.uid;
      this.solicitudesService.obtenerSolicitudesAceptadasPorUser(usuarioId).subscribe((solicitudes) => {
        console.log('Todas las solicitudes aceptadas:', solicitudes);
  
        // Filtrar las solicitudes para obtener solo las que coinciden con el usuario y conductor
        const solicitudesFiltradas = solicitudes.filter(solicitud => 
          solicitud.conductorUid === this.viajes.conductorUid &&
          solicitud.usuariouId === this.user.uid
        );
  
        console.log('Solicitudes filtradas:', solicitudesFiltradas);
  
        this.solicitudes = solicitudesFiltradas;
      });
    }
  
    // Restablecer solicitudEnviada a false después de cargar un nuevo viaje
    private resetSolicitudEnviada() {
      this.solicitudEnviada = false;
    }

    irAlQR() {
      this.router.navigate(['qr', {
        idSolicitud: this.viajes.id,
        lugarEspera: this.viajes.lugarespera,
        lugarDestino: this.viajes.lugardestino,
        nombreConductor: this.viajes.conductor,
        nombreUsuario: this.user.nombre
      }]);
    }
    
    

    mostrarAlertaEsperaConductor() {
      this.alertController.create({
        header: 'Esperando Respuesta del Conductor',
        message: 'Tu solicitud de viaje ha sido enviada. Por favor, espera la respuesta del conductor.',
        backdropDismiss: false, // Evitar que se cierre al tocar fuera de la alerta
        animated: true, // Puedes ajustar esto según tus preferencias
        translucent: true, // Puedes ajustar esto según tus preferencias
      }).then((alert) => {
        this.solicitudPendiente = true; 
        alert.present();
      });
    }

  
    editarViaje(){
      this.router.navigate(['updateviaje', this.viajes.id]);
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
          this.deleteViajenormal();
          this.router.navigate(['viajes']);
        }
      });
    }


    

}
