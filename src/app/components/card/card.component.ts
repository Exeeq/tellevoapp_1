import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() lugarespera!: string;
  @Input() lugardestino!: string;
  @Input() patente!: string;
  @Input() vehiculo!: string;
  @Input() capacidad!: string;
  @Input() fecha!: string;
  @Input() hora!: string;

  constructor() { }

  ngOnInit() {}

}
