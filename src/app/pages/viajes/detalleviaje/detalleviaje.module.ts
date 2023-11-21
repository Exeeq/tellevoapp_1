import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleviajePageRoutingModule } from './detalleviaje-routing.module';

import { DetalleviajePage } from './detalleviaje.page';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleviajePageRoutingModule
  ],
  declarations: [DetalleviajePage,CardComponent]
})
export class DetalleviajePageModule {}
