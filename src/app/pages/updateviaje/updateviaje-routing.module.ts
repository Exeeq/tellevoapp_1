import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateviajePage } from './updateviaje.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateviajePageRoutingModule {}
