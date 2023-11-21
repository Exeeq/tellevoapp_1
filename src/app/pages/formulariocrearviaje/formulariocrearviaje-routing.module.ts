import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioCrearViajePage } from './formulariocrearviaje.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioCrearViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariocrearviajePageRoutingModule {}
