import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicalistaPage } from './musicalista.page';

const routes: Routes = [
  {
    path: '',
    component: MusicalistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicalistaPageRoutingModule {}
