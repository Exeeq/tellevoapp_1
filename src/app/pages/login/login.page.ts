import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { TranslateService } from '@ngx-translate/core';


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
    private authservice: AuthService,
    private translateService: TranslateService,
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

  private async mostrarMensaje(mensajeKey: string) {
    const mensaje = await this.translateService.get(mensajeKey).toPromise();
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
      header: await this.translateService.get('Recuperar Contraseña').toPromise(),
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: await this.translateService.get('Correo Electrónico').toPromise(),
        },
      ],
      buttons: [
        {
          text: await this.translateService.get('Cancelar').toPromise(),
          role: 'cancel',
        },
        {
          text: await this.translateService.get('Enviar').toPromise(),
          handler: async (data) => {
            try {
              const user = await this.authservice.getUserByEmail(data.email);
  
              if (user && user.docs.length > 0) {
                await this.authservice.resetearContrasena(data.email);
                this.mostrarMensaje(await this.translateService.get('Se ha enviado un correo electrónico para restablecer la contraseña.').toPromise());
              } else {
                this.mostrarMensaje(await this.translateService.get('No hay una cuenta asociada a este correo electrónico.').toPromise());
              }
            } catch (error) {
              console.error('Error al enviar correo electrónico de recuperación de contraseña:', error);
              this.mostrarMensaje(await this.translateService.get('Error al enviar correo electrónico de recuperación de contraseña.').toPromise());
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
}
