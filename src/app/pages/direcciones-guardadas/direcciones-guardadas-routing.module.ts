import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionesGuardadasPage } from './direcciones-guardadas.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionesGuardadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionesGuardadasPageRoutingModule {}
