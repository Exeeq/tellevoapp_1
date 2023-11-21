import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminoscondicionesPage } from './terminoscondiciones.page';

const routes: Routes = [
  {
    path: '',
    component: TerminoscondicionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminoscondicionesPageRoutingModule {}
