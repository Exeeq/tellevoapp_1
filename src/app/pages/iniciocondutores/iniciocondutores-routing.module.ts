import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciocondutoresPage } from './iniciocondutores.page';

const routes: Routes = [
  {
    path: '',
    component: IniciocondutoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciocondutoresPageRoutingModule {}
