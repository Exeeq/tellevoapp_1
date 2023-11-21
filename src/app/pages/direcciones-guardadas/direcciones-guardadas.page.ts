import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { Direccion } from './direcciones.model';

@Component({
  selector: 'app-direcciones-guardadas',
  templateUrl: './direcciones-guardadas.page.html',
  styleUrls: ['./direcciones-guardadas.page.scss'],
})
export class DireccionesGuardadasPage implements OnInit {

  listaDirecciones: Direccion[] = [];
  
  constructor(private router: Router, private direccionesService: DireccionesService) { }

  ngOnInit() {
    this.listaDirecciones = this.direccionesService.getAll()
  }

  ionViewWillEnter() {
    this.listaDirecciones = this.direccionesService.getAll()
  }

  addDireccion(){
    this.router.navigate(['/formulariocreardirecciones'])
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }
}