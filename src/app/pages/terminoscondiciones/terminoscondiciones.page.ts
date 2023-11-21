import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-terminoscondiciones',
  templateUrl: './terminoscondiciones.page.html',
  styleUrls: ['./terminoscondiciones.page.scss'],
})
export class TerminoscondicionesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirigir(){
    this.router.navigate(['login']);
  }

}
