import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr-conductor',
  templateUrl: './qr-conductor.page.html',
  styleUrls: ['./qr-conductor.page.scss'],
})
export class QrConductorPage implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

  }

}
