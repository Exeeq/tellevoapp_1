import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudesService } from 'src/app/services/firebase/solicitudes.service';
import { QrService } from 'src/app/services/qr.service';
import { SolicitudViaje } from 'src/app/interfaces/isolicitudviajes';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';

@Component({
  selector: 'app-qr',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/viajes"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center centrado2">
          ¡COMPLETADO!
        </ion-title>
        <ion-icon slot="end" name="information-circle-outline" size="large"></ion-icon>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-card class="qr-card">
        <ion-card-header>
          <ion-card-title class="centrado2 ion-text-center">¡VIAJE TOMADO CON ÉXITO!</ion-card-title>
        </ion-card-header>

        <div class="qr-container ion-text-center">
          <img [src]="qrCodeURL" alt="QR Code" class="centered-image">
        </div>

        <ion-card-content class="ion-text-center mensaje">
          <p class="mensaje-texto">
            GUARDA ESTE CÓDIGO. MUESTRA EL QR AL CONDUCTOR PARA VALIDAR EL VIAJE.
          </p>
        </ion-card-content>

        <ion-button class="ion-text-center" (click)="irMapa()">
          IR AL MAPA
        </ion-button>
      </ion-card>

    </ion-content>
  `,
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  user: any;
  qrCodeURL: string = '';
  solicitud: SolicitudViaje | null = null;
  idSolicitud: string = '';
  lugarEspera: string = '';
  lugarDestino: string = '';
  nombreConductor: string = '';
  nombreUsuario: string = '';
  constructor(
    private qrService: QrService,
    private solicitudService: SolicitudesService,
    private usuarioActual: UsuarioActualService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.usuarioActual.getCurrentUser();
    console.log('Usuario:', this.user);

    this.route.params.subscribe(params => {
      this.idSolicitud = params['idSolicitud'];
      this.lugarEspera = params['lugarEspera'];
      this.lugarDestino = params['lugarDestino'];
      this.nombreConductor = params['nombreConductor'];
      this.nombreUsuario = params['nombreUsuario'];
      console.log('ID Solicitud:', this.idSolicitud);
      console.log('Lugar Espera:', this.lugarEspera);
      console.log('Lugar Destino:', this.lugarDestino);

      this.generarCodigoQRParaSolicitud(this.idSolicitud, this.user.uid, this.lugarEspera, this.lugarDestino);
    });
  }

  generarCodigoQRParaSolicitud(idSolicitud: string, idUsuario: string, lugarEspera: string, lugarDestino: string) {
    if (!this.user) {
      console.error('Usuario no definido');
      return;
    }

    const size = 200;

    this.qrService.generateQRCodeForSolicitud(idSolicitud, this.user.uid, this.lugarDestino, this.lugarEspera, this.nombreUsuario, this.nombreConductor)
      .subscribe((blob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const qrDataURL = reader.result as string;
          console.log('QR Code URL:', qrDataURL);
          this.qrCodeURL = qrDataURL;
        };
        reader.readAsDataURL(blob);
      });

    this.solicitudService.obtenerSolicitud(idSolicitud).subscribe((solicitud) => {
      if (solicitud !== undefined) {
        console.log('Solicitud:', solicitud);
        this.solicitud = solicitud;
      }
    });
  }

  irMapa() {
    this.router.navigate(['mapa', {
      lugarEspera: this.lugarEspera,
      lugarDestino: this.lugarDestino
    }]);
  }
}
