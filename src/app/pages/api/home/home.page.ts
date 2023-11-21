import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViajeService } from 'src/app/services/api/viaje.service';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listaViajes: any = [];
  user: any;

  constructor(private router: Router,
              private viajesApi: ViajeService,
              private usuarioActualService: UsuarioActualService
              ) { }

  ngOnInit() {
    this.listar();
    this.user = this.usuarioActualService.getCurrentUser();
  }

  ionViewWillEnter(){
    this.listar();
  }

  listar() {
    this.viajesApi.listViajes().subscribe((resp) => {
      this.listaViajes = resp;
    })
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Recargar la lista de viajes
      this.listar();
      event.target.complete();
    }, 2000);
  }

  redirectCrearViaje(){
    this.router.navigate(['/apiadd'])
  }

  hola(){
    console.log(this.user.results[0].login.username);
  }


  
}
