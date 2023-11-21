import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: any;

  constructor(
    private usuarioActualService: UsuarioActualService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.usuarioActualService.getCurrentUser();
  }

  irAPerfil() {
    this.router.navigate(['/perfil']);
  }

  logout(){
    this.auth.logout;
    this.router.navigate(['login'])
  }
}
