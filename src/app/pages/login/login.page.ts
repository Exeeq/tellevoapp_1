import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private usuarioActualService: UsuarioActualService,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.authservice.checkAuth()
      .then((user) => {
        if (user) {
          this.usuarioActualService.obtenerUsuario(user);
        }
      })
      .catch((error) => {
        console.error('Error en autenticación: ', error);
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

  private async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async login(email: any, pass: any) {
    this.authservice.login(email, pass, this.rememberMe);
  }

  registrarse() {
    this.router.navigate(['registrarse']);
  }

  async recuperarContrasena() {
    const alert = await this.alertController.create({
        header: 'Recuperar Contraseña',
        inputs: [
            {
                name: 'email',
                type: 'text',
                placeholder: 'Correo Electrónico',
            },
        ],
        buttons: [
            {
                text: 'Cancelar',
                role: 'cancel',
            },
            {
                text: 'Enviar',
                handler: async (data) => {
                    try {
                        // Verificar si el correo existe en Firebase
                        const user = await this.authservice.getUserByEmail(data.email);
                        
                        if (user && user.docs.length > 0) {
                            // El correo existe, enviar el correo de restablecimiento de contraseña
                            await this.authservice.resetearContrasena(data.email);
                            this.mostrarMensaje('Se ha enviado un correo electrónico para restablecer la contraseña.');
                        } else {
                            // El correo no existe, mostrar un mensaje indicando esto
                            this.mostrarMensaje('No hay una cuenta asociada a este correo electrónico.');
                        }
                    } catch (error) {
                        console.error('Error al enviar correo electrónico de recuperación de contraseña:', error);
                        this.mostrarMensaje('Error al enviar correo electrónico de recuperación de contraseña.');
                    }
                },
            },
        ],
    });
  
    await alert.present();
  }
}
