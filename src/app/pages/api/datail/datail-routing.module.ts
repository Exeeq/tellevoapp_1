import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatailPage } from './datail.page';

const routes: Routes = [
  {
    path: '',
    component: DatailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatailPageRoutingModule {}
