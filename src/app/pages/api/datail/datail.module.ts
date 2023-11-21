import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatailPageRoutingModule } from './datail-routing.module';

import { DatailPage } from './datail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatailPageRoutingModule
  ],
  declarations: [DatailPage]
})
export class DatailPageModule {}
