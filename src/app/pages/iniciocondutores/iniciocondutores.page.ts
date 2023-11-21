import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciocondutores',
  templateUrl: './iniciocondutores.page.html',
  styleUrls: ['./iniciocondutores.page.scss'],
})
export class IniciocondutoresPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irCrearViaje(){
    this.router.navigate(['apiadd']);
  }

}
