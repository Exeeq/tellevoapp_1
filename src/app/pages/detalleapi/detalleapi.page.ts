import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalleapi',
  templateUrl: './detalleapi.page.html',
  styleUrls: ['./detalleapi.page.scss'],
})
export class DetalleapiPage implements OnInit {

  digimon: any
  constructor(private ActivatedRoute: ActivatedRoute,
              private HttpClient: HttpClient) { }

  ngOnInit() {
    const id = this.ActivatedRoute.snapshot.paramMap.get("id");
    this.HttpClient.get<any>("https://www.digi-api.com/api/v1/digimon/"+id).subscribe(resultado => {
      //console.log(resultado);
      this.digimon = resultado;
    });
  }

}
