import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciocondutoresPageRoutingModule } from './iniciocondutores-routing.module';

import { IniciocondutoresPage } from './iniciocondutores.page';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciocondutoresPageRoutingModule,
    TranslateModule
  ],
  declarations: [IniciocondutoresPage]
})
export class IniciocondutoresPageModule {}
