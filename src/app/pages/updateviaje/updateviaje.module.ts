import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateviajePageRoutingModule } from './updateviaje-routing.module';

import { UpdateviajePage } from './updateviaje.page';

import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateviajePageRoutingModule,
    TranslateModule
  ],
  declarations: [UpdateviajePage]
})
export class UpdateviajePageModule {}
