import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminoscondicionesPageRoutingModule } from './terminoscondiciones-routing.module';

import { TerminoscondicionesPage } from './terminoscondiciones.page';

import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminoscondicionesPageRoutingModule,
    TranslateModule
  ],
  declarations: [TerminoscondicionesPage]
})
export class TerminoscondicionesPageModule {}
