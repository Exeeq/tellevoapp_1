import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulariocrearviajePageRoutingModule } from './formulariocrearviaje-routing.module';

import { FormularioCrearViajePage } from './formulariocrearviaje.page';

import { TranslateModule } from '@ngx-translate/core'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormulariocrearviajePageRoutingModule,
    TranslateModule
  ],
  declarations: [FormularioCrearViajePage],
})
export class FormulariocrearviajePageModule {}
