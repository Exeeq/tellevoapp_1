import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterConductorPage } from './register-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterConductorPageRoutingModule {}
