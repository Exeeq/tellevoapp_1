import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-formulariocreardirecciones',
  templateUrl: './formulariocreardirecciones.page.html',
  styleUrls: ['./formulariocreardirecciones.page.scss'],
})
export class FormulariocreardireccionesPage implements OnInit {

  constructor(private router: Router,
              private direccionService: DireccionesService,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present()
  }


  addDireccion(nombre: any, comuna: any, calle: any, detalle: any) {
    if (!nombre.value || !comuna.value || !calle.value || !detalle.value) {
      this.mensajeToast("Todos los campos obligatorios deben estar llenos.");
      return; 
    }

    this.direccionService.addDireccion(nombre.value,comuna.value,calle.value,detalle.value);
    this.mensajeToast("Direccion Agregada!");
    this.router.navigate(['direcciones-guardadas']);
  }

  volver(){
    this.router.navigate(['crearviaje']);
  }
}
