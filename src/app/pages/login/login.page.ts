import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuariosrandomService } from 'src/app/services/usuariosrandom.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/api/usuarios.service';
import { ConductoresService } from 'src/app/services/api/conductores.service';
import { IUsuarios } from 'src/app/interfaces/iusuarios';
import { IConductores } from 'src/app/interfaces/iconductores';
import Swal from 'sweetalert2';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';
import { AuthService } from 'src/app/services/firebase/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rememberMe: boolean = false;
  constructor(private router: Router,
              private toastController: ToastController,
              private formbuilder: FormBuilder,
              private usuarioActualService: UsuarioActualService,
              private authservice: AuthService             
  ) { }

  ngOnInit() {
    this.authservice.checkAuth()
      .then((user) => {
        if (user) {
          // Guarda la información del usuario autenticado
          this.usuarioActualService.obtenerUsuario(user);
        }
      })
      .catch((error) => {
        console.error('Error en autenticación: ', error);
      });
  }

  async mensajeToast(mensaje: string){
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

  // obtenerUsuarios() {
  //   this.usuariosRandomService.obtenerUsuariosComunes()
  // }

  // cargarUsuariosAleatorios() {
  //   this.usuariosRandomService.obtenerUsuariosComunes().subscribe((usuarios) => {
  //     usuarios.forEach((usuario) => {
  //       usuario["esConductor"] = false;
  //       this.usuariosService.addUsuario(usuario).subscribe((response) => {
  //       });
  //     });
  //   });

  //   this.usuariosRandomService.obtenerUsuariosConductores().subscribe((conductores) => {
  //     conductores.forEach((conductor) => {
  //       conductor["esConductor"] = true;
  //       this.conductoresService.addConductor(conductor).subscribe((response) => {
  //       });
  //     });
  //   });
  // }

  // eliminarUsuariosYConductores() {
  //   // Elimina los usuarios normales
  //   this.usuariosService.listUsuarios().subscribe((usuarios: IUsuarios[]) => {
  //     usuarios.forEach((usuario: IUsuarios) => {
  //       this.usuariosService.deleteUsuario(usuario.id).subscribe(() => {
  //         // Realiza acciones adicionales si es necesario
  //       });
  //     });
  //   });
  
  //   // Elimina los conductores
  //   this.conductoresService.listConductor().subscribe((conductores: IConductores[]) => {
  //     conductores.forEach((conductor: IConductores) => {
  //       this.conductoresService.deleteConductor(conductor.id).subscribe(() => {
  //         // Realiza acciones adicionales si es necesario
  //       });
  //     });
  //   });
  // }
  

  //CON ALERTAS XD
  // cargarUsers(){
  //   Swal.fire({
  //     title: '¿Desea Cargar Usuarios?',
  //     icon: 'success',
  //     showDenyButton: true,
  //     confirmButtonText: 'Confirmar',
  //     denyButtonText: 'Cancelar',
  //     heightAuto: false,
  //   }).then((result) => {
  //     //SI SE CONFIRMA SE ELIMINAN LOS USUARIOS
  //     if (result.isConfirmed) {
  //       this.cargarUsuariosAleatorios();
  //     }
  //   });
  // }

  // eliminarUsers(){
  //   Swal.fire({
  //     title: '¿Desea Eliminar los usuarios cargados?',
  //     icon: 'warning',
  //     showDenyButton: true,
  //     confirmButtonText: 'Confirmar',
  //     denyButtonText: 'Cancelar',
  //     heightAuto: false,
  //   }).then((result) => {
  //     //SI SE CONFIRMA SE ELIMINAN LOS USUARIOS
  //     if (result.isConfirmed) {
  //       this.eliminarUsuariosYConductores();
  //     }
  //   });
  // }

  //Método para iniciar sesión:
  async login(email: any, pass: any) {
    this.authservice.login(email, pass, this.rememberMe);
  }

  registrarse(){
    this.router.navigate(['registrarse'])
  }
    
  
}

  
  

