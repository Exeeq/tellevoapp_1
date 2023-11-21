import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UsuarioActualService } from 'src/app/services/usuario-actual.service';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  user: any;
  langs: string [] = [];
  weatherData: any;
  recommendations: string[] = [];

  constructor(private router: Router,
              private auth: AuthService,
              private usuarioActual: UsuarioActualService,
              private climaService: ClimaService
              ) { }

  ngOnInit() {
    this.user = this.usuarioActual.getCurrentUser();

    this.climaService.getWeather('Santiago') 
      .subscribe((data: any) => {
        this.weatherData = data;
        this.generateRecommendations();
      });
  }

  generateRecommendations() {

    const weatherCondition = this.weatherData.weather[0].main.toLowerCase();
    if (weatherCondition === 'clouds') {
      this.recommendations.push('Sal y abrígate, está nublado.');
    } else if (weatherCondition === 'rain') {
      this.recommendations.push('Lleva un paraguas, está lloviendo.');
    }

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
