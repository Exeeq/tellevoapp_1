import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Mensaje } from './inbox.model';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  listaMensajes: Mensaje[] = [];
  user: any;
  constructor(private mensajeservice: MensajesService,
              private router: Router,
              private toastController:ToastController, 
              private alertController:AlertController,
              private usuarioActualservice: UsuarioActualService) { }

  ngOnInit() {
    this.listaMensajes = this.mensajeservice.getAll()
    this.user = this.usuarioActualservice.getCurrentUser();
    
  }

  ionViewWillEnter() {
    this.listaMensajes = this.mensajeservice.getAll()
  }

  addMensaje(mensaje: any) {
    if (mensaje && mensaje.value) {
      const mensajeText = mensaje.value;
      this.mensajeservice.addMensaje(mensajeText);
      // También puedes limpiar el input después de agregar el mensaje
      mensaje.value = '';
      // Actualiza la lista de mensajes después de agregar uno nuevo
      this.listaMensajes = this.mensajeservice.getAll();
    }
  }
  
  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present()
  }

  async deleteMensaje() {
    const alerta = await this.alertController.create({
      header: 'Eliminar el mensaje',
      message: '¿Estas seguro que deseas eliminar el mensaje?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.mensajeToast("MENSAJE ELIMINADO");
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.mensajeToast("Accion cancelada");
          }
        }
      ]
    });
    await alerta.present();
    let resultado = await alerta.onDidDismiss
  }

}
