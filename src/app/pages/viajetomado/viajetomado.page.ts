import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';

@Component({
  selector: 'app-viajetomado',
  templateUrl: './viajetomado.page.html',
  styleUrls: ['./viajetomado.page.scss'],
})
export class ViajetomadoPage implements OnInit {
  user: any
  constructor(private usuarioActualService: UsuarioActualService, private router: Router) { }

  ngOnInit() {
    this.user = this.usuarioActualService.getCurrentUser();
  }

  volver(){
    this.router.navigate(['inicio'])
  }
}
