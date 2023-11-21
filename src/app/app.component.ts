import { Component } from '@angular/core';
import { LoginserviceService } from './services/loginservice.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { UsuarioActualService } from './services/usuario-actual.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'INICIO', url: 'inicio', icon: 'homez' },
    { title: 'VIAJES DISPONIBLES', url: 'viajes', icon: 'paper-plane' },
    { title: 'API TELLEVOAP', url: 'apihome', icon: 'map' },
    { title: 'DIRECIONES', url: 'direcciones-guardadas', icon: 'compass' },
    { title: 'SER CONDUCTOR', url: 'register-conductor', icon: 'car-outline' },
  ];

  public appapi = [
    { title: 'HOMEAPI', url: 'apihome', icon: 'ellipse' },
    { title: 'HOME', url: 'inicio', icon: 'home' },
    { title: 'API DIGIMON', url: 'mensajes', icon: 'mail' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  user: any;
  constructor(private router: Router, private menuController: MenuController,
              private transService: TranslateService,
              private usuarioActual: UsuarioActualService) {
                this.transService.setDefaultLang('cor');
                this.transService.addLangs(['es','en']);
              }
  
  ngOnInit() {
    this.user = this.usuarioActual.getCurrentUser();
  }
  
  mostrarMenu() {
    console.log(this.router.url);
    return this.router.url !== '/login' && this.router.url !== '/terminoscondiciones' && this.router.url !== '/cargando' && this.router.url !== '/registrarse';
  }

  mostrarMenuapi() {
    const aux = [
      '/apihome',
      '/apiadd',
      '/apiupdate',
      '/apidatail',
    ];
    return aux.includes(this.router.url); 
  }


}


