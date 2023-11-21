import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormulariocreardireccionesPage } from './formulariocreardirecciones.page';

const routes: Routes = [
  {
    path: '',
    component: FormulariocreardireccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariocreardireccionesPageRoutingModule {}
