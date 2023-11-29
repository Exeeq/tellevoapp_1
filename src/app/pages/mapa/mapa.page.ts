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
    this.route.paramMap.subscribe((params) => {
      const lugarEspera = params.get('lugarEspera');
      const lugarDestino = params.get('lugarDestino');

      if (lugarEspera !== null && lugarDestino !== null) {
        this.mapaService.getCoordinatesFromLocation(lugarEspera).subscribe(
          (coordinatesEspera) => {
            if (coordinatesEspera) {
              const zoom = 16;
              this.mapaService.createMap('map-container', coordinatesEspera, zoom);
              this.mapaService.addMarker(coordinatesEspera);

              this.mapaService.getCoordinatesFromLocation(lugarDestino).subscribe(
                (coordinatesDestino) => {
                  if (coordinatesDestino) {
                    this.mapaService.addMarker(coordinatesDestino);

                    this.mapaService.getRoute(`${coordinatesEspera[1]},${coordinatesEspera[0]}`, `${coordinatesDestino[1]},${coordinatesDestino[0]}`).subscribe(
                      (routeCoordinates) => {
                        if (routeCoordinates.length > 0) {
                          this.mapaService.addPolyline(routeCoordinates);
                        } else {
                          console.error('No se pudo obtener la ruta.');
                        }
                      },
                      (error) => {
                        console.error('Error al obtener la ruta:', error);
                      }
                    );
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
