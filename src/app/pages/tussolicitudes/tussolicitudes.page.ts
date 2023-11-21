import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { SolicitudesService } from 'src/app/services/firebase/solicitudes.service';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tussolicitudes',
  templateUrl: './tussolicitudes.page.html',
  styleUrls: ['./tussolicitudes.page.scss'],
})
export class TussolicitudesPage implements OnInit {
  solicitudes: any[] = [];
  user: any;

  constructor(
    private solicitudesService: SolicitudesService,
    private usuarioActualService: UsuarioActualService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.usuarioActualService.getCurrentUser();
    const conductorId = this.user.uid;

    this.solicitudesService.getSolicitudesPendientesConductor(conductorId).subscribe((solicitudes) => {

      for (const solicitud of solicitudes) {
        this.solicitudesService.obtenerNombreUsuario(solicitud.usuariouId).subscribe((nombreUsuario) => {
          solicitud.nombreusuario = nombreUsuario;
        });

        this.solicitudesService.obtenerSolicitud(solicitud.id).subscribe((solicitudActualizada) => {
          if (solicitudActualizada) {
            // Aquí puedes manejar la actualización de la solicitud si es necesario
            console.log('Solicitud actualizada:', solicitudActualizada);
          } else {
            console.log('La solicitud no se encontró:', solicitud.id);
            // Puedes manejar este caso según tus necesidades
          }
        });
      }

      this.solicitudes = solicitudes;
    });
  }

  

  private actualizarListaSolicitudes() {
    // Volver a obtener las solicitudes después de aceptar o rechazar
    const conductorId = this.user.uid;
    this.solicitudesService.getSolicitudesPendientesConductor(conductorId).subscribe((solicitudes) => {
      this.solicitudes = solicitudes;
    });
  }

  aceptarSolicitud(solicitudId: string) {
    this.solicitudesService
      .aceptarSolicitud(solicitudId)
      .then(() => {
        this.actualizarListaSolicitudes();
        this.redirigirUsuarioAPaginaQR(solicitudId);
      })
      .catch((error) => {
        console.error('Error al aceptar la solicitud:', error);
      });
  }

  redirigirUsuarioAPaginaQR(solicitudId: string) {
    this.router.navigate(['qr-conductor', solicitudId]);
  }
  

  rechazarSolicitud(solicitudId: string) {
    this.solicitudesService
      .rechazarSolicitud(solicitudId)
      .then(() => {
        this.actualizarListaSolicitudes();
      })
      .catch((error) => {
        console.error('Error al rechazar la solicitud:', error);
      });
  }
}
