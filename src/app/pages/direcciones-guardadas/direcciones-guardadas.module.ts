import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionesGuardadasPageRoutingModule } from './direcciones-guardadas-routing.module';

import { DireccionesGuardadasPage } from './direcciones-guardadas.page';

import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionesGuardadasPageRoutingModule,
    TranslateModule
  ],
  declarations: [DireccionesGuardadasPage]
})
export class DireccionesGuardadasPageModule {}
