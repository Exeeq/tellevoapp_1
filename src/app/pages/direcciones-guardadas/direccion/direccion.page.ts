import { Component, OnInit } from '@angular/core';
import { Direccion } from '../direcciones.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {

  direccion!: Direccion;
  constructor(private router: Router,
    private direccionesService: DireccionesService,
    private toastController: ToastController,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      const aux = param.get('id')
      if (aux) {
        this.direccion = this.direccionesService.getDireccion(aux)
      }
    })
  }

  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    })
    toast.present()
  }

  async deleteDireccion() {
    //this.mensajeToast("¡Viaje Cancelado!")
    const alerta = await this.alertController.create({
      header: 'ELIMINAR DIRECCION', 
      message: 'Está seguro que desea eliminar la direccion?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            if(this.direccion && this.direccion.id !== undefined){
              this.direccionesService.deleteDireccion(this.direccion.id);
              this.router.navigate(['/direcciones-guardadas'])
              this.mensajeToast("¡DIRECCION ELIMINADA!")
            } else {

            }
          }
        },
        {
          text: 'No',
          handler: () => {
            this.mensajeToast("¡ACCIÓN CANCELADA!")
          }
        }
      ]
    });
    await alerta.present();
    let resultado = await alerta.onDidDismiss();
    
  }

}


