import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterConductorPageRoutingModule } from './register-conductor-routing.module';

import { RegisterConductorPage } from './register-conductor.page';

import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterConductorPageRoutingModule,
    TranslateModule
  ],
  declarations: [RegisterConductorPage]
})
export class RegisterConductorPageModule {}
