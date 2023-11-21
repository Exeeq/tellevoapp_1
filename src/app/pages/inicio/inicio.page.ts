import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  user: any;
  langs: string [] = [];

  constructor(private router: Router,
              private auth: AuthService,
              private usuarioActual: UsuarioActualService
              ) { }

  ngOnInit() {
    this.user = this.usuarioActual.getCurrentUser();
  }


  irCrearViaje(){
    this.router.navigate(['formulariocrearviaje']);
  }
  
  irAPerfil() {
    this.router.navigate(['/perfil']);
  }

  logout(){
    this.auth.logout;
    this.router.navigate(['login'])
  }

  
}
