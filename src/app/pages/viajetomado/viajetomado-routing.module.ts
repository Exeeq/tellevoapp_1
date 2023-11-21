import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajetomadoPage } from './viajetomado.page';

const routes: Routes = [
  {
    path: '',
    component: ViajetomadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajetomadoPageRoutingModule {}
