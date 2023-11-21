import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from 'src/app/services/viajes.service';
import { Viajes } from './viajes.model';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';



@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  user: any;
  viajes!: Viajes;
  listaViajes: any = [];
  constructor(private router: Router,
              private toastController: ToastController,
              private alertController: AlertController,
              private firestore: FirestoreService,
              private activatedRoute: ActivatedRoute,
              private usuarioActualService: UsuarioActualService,
              private zone: NgZone) { }

  ngOnInit() {
    this.user = this.usuarioActualService.getCurrentUser();
  }

  


  //Método que muestra mensajes en pantalla
  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    })
    toast.present()
  }

  ionViewWillEnter(){
    this.listar();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  listar() {
    if (this.user.esConductor === true) {
      // Utilizar el nuevo método de filtrado que incluye el UID del conductor
      this.firestore.getCollectionWithFilterForConductor('viajes', 'conductorUid', '==', this.user.uid, this.user.uid)
        .subscribe((viajes: any) => {
          this.listaViajes = viajes;
        });
    } else {
      // Si el usuario no es conductor, obtener todos los viajes
      this.firestore.getCollection('viajes').subscribe((viajes: any) => {
        this.listaViajes = viajes;
      });
    }
  }

  irFormularioAdd(){
    this.router.navigate(['formulariocrearviaje']);
  }
}
