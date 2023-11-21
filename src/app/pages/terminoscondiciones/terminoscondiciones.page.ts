import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-terminoscondiciones',
  templateUrl: './terminoscondiciones.page.html',
  styleUrls: ['./terminoscondiciones.page.scss'],
})
export class TerminoscondicionesPage implements OnInit {

  langs: string[] = [];
  idioma!: any;

  constructor(
    private router: Router,
    private transService: TranslateService
    ) { 
      this.langs = this.transService.getLangs();
    }

  ngOnInit() {
  }

  redirigir(){
    this.router.navigate(['login']);
  }

  changeLangs(event:any){
    this.transService.use(event.detail.value);
  }
}
