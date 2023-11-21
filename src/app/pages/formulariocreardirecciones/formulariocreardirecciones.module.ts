import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulariocreardireccionesPageRoutingModule } from './formulariocreardirecciones-routing.module';

import { FormulariocreardireccionesPage } from './formulariocreardirecciones.page';

import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormulariocreardireccionesPageRoutingModule,
    TranslateModule
  ],
  declarations: [FormulariocreardireccionesPage]
})
export class FormulariocreardireccionesPageModule {}
