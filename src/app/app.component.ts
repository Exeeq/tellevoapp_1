import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioActualService } from './services/usuario-actual.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'INICIO', url: 'inicio', icon: 'home' },
    { title: 'VIAJES DISPONIBLES', url: 'viajes', icon: 'paper-plane' },
    { title: 'DIRECIONES', url: 'direcciones-guardadas', icon: 'compass' },
    { title: 'SER CONDUCTOR', url: 'register-conductor', icon: 'car-outline' },
  ];

  public appapi = [
    { title: 'HOMEAPI', url: 'apihome', icon: 'ellipse' },
    { title: 'HOME', url: 'inicio', icon: 'home' },
    { title: 'API DIGIMON', url: 'mensajes', icon: 'mail' },
  ];

  user: any;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private transService: TranslateService,
    private usuarioActual: UsuarioActualService
  ) {
    this.transService.setDefaultLang('es');
    this.transService.addLangs(['cor', 'en']);
  
    const browserLang = this.transService.getBrowserLang();
  
    if (browserLang) {
      this.transService.use(browserLang.match(/cor|en/) ? browserLang : 'es');
    } else {
      this.transService.use('es');
    }
  }
  

  ngOnInit() {
    this.user = this.usuarioActual.getCurrentUser();
  }

  mostrarMenu() {
    return (
      !this.router.url.includes('/login') &&
      !this.router.url.includes('/terminoscondiciones') &&
      !this.router.url.includes('/cargando') &&
      !this.router.url.includes('/registrarse')
    );
  }

  mostrarMenuapi() {
    const aux = ['/apihome', '/apiadd', '/apiupdate', '/apidatail'];
    return aux.includes(this.router.url);
  }
}
