import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TussolicitudesPageRoutingModule } from './tussolicitudes-routing.module';

import { TussolicitudesPage } from './tussolicitudes.page';

import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TussolicitudesPageRoutingModule,
    TranslateModule
  ],
  declarations: [TussolicitudesPage]
})
export class TussolicitudesPageModule {}
