import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapaService } from 'src/app/services/mapa.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  constructor(private mapaService: MapaService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Proceso de obtención de coordenadas desde ubicaciones escritas
    this.route.paramMap.subscribe((params) => {
      const lugarEspera = params.get('lugarEspera');
      const lugarDestino = params.get('lugarDestino');

      if (lugarEspera !== null && lugarDestino !== null) {
        // Utilizar un servicio de geocodificación para obtener coordenadas del lugar de espera
        this.mapaService.getCoordinatesFromLocation(lugarEspera).subscribe(
          (coordinatesEspera) => {
            if (coordinatesEspera) {
              // Crear el mapa con el lugar de espera
              const zoom = 16;
              this.mapaService.createMap('map-container', coordinatesEspera, zoom);

              // Agregar un marcador en el lugar de espera
              this.mapaService.addMarker(coordinatesEspera);

              // Utilizar un servicio de geocodificación para obtener coordenadas del lugar de destino
              this.mapaService.getCoordinatesFromLocation(lugarDestino).subscribe(
                (coordinatesDestino) => {
                  if (coordinatesDestino) {
                    // Agregar un marcador en el lugar de destino
                    this.mapaService.addMarker(coordinatesDestino);

                    // Crear una polilínea que conecta el lugar de espera con el lugar de destino
                    this.mapaService.addPolyline([coordinatesEspera, coordinatesDestino]);
                  } else {
                    console.error('No se pudieron obtener las coordenadas para el lugar de destino.');
                  }
                },
                (error) => {
                  console.error('Error al obtener las coordenadas del lugar de destino:', error);
                }
              );
            } else {
              console.error('No se pudieron obtener las coordenadas para el lugar de espera.');
            }
          },
          (error) => {
            console.error('Error al obtener las coordenadas del lugar de espera:', error);
          }
        );
      } else {
        console.error('Lugar de espera o lugar de destino es null.');
      }
    });
  }
}
