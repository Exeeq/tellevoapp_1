import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicalistaPageRoutingModule } from './musicalista-routing.module';

import { MusicalistaPage } from './musicalista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicalistaPageRoutingModule
  ],
  declarations: [MusicalistaPage]
})
export class MusicalistaPageModule {}
