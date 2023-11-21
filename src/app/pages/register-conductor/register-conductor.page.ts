import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-conductor',
  templateUrl: './register-conductor.page.html',
  styleUrls: ['./register-conductor.page.scss'],
})
export class RegisterConductorPage implements OnInit {
  
  user: any;

  constructor(
    private router: Router,
    private usuarioActual: UsuarioActualService,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Utilizamos la suscripción a cambios en el usuario actual
    this.usuarioActual.obtenerUsuarioObservable().subscribe((user) => {
      this.user = user;
    });
  }

  async mensajeToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async registrarConductor(licencia: any) {
    if (!this.user || !this.user.uid || !licencia.value) {
      this.mensajeToast('Todos los campos son obligatorios.');
      return;
    } else {
      Swal.fire({
        icon: 'success',
        title: '¡Ahora eres conductor! Por favor, reinicie la app',
        showConfirmButton: false,
        timer: 2300,
        heightAuto: false,
      });
    }
    
    await this.authService.actualizarEsConductor(this.user.uid, true);
    this.router.navigate(['/inicio']);
  }
  
}
