import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionPageRoutingModule } from './direccion-routing.module';

import { DireccionPage } from './direccion.page';
import { Card2Component } from 'src/app/components/card2/card2.component';

import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionPageRoutingModule,
    TranslateModule
  ],
  declarations: [DireccionPage,Card2Component]
})
export class DireccionPageModule {}
