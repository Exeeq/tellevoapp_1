import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  digimones: any[] = [];

  paginaActual = 0;

  constructor(private httpCliente: HttpClient) { }

  ngOnInit() {
    this.cargarData();
  }

  cargarData(){
    const url = `https://www.digi-api.com/api/v1/digimon?page=${this.paginaActual};`
    this.httpCliente.get<any>(url).subscribe(resultado => {
      this.digimones = resultado.content
    });
  }

  cargarMas() {
    this.paginaActual++;
    const url = `https://www.digi-api.com/api/v1/digimon?page=${this.paginaActual};`
    this.httpCliente.get<any>(url).subscribe(resultado => {
      this.digimones = this.digimones.concat(resultado.content);
    });
  }

  cargarSiguientePage() {
    this.paginaActual++;
    this.cargarData();
  }

  volverAnterior() {
    if (this.paginaActual < 1){
      this.paginaActual = 0;
      this.cargarData();
    } else {
      this.paginaActual--;
      this.cargarData();
    }
  }

  mensaje(){
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Something went wrong!',
      heightAuto: false,
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }

}
