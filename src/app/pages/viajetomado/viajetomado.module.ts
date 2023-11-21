import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajetomadoPageRoutingModule } from './viajetomado-routing.module';

import { ViajetomadoPage } from './viajetomado.page';

import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajetomadoPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViajetomadoPage]
})
export class ViajetomadoPageModule {}
