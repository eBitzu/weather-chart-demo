import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import * as fromComponents from './components';
import { MyMaterialModule } from './material.module';
import * as fromServices from './services';

@NgModule({
  imports: [CommonModule, MyMaterialModule, ChartsModule, ReactiveFormsModule],
  declarations: [...fromComponents.components],
  providers: [...fromServices.services],
  exports: [
    ...fromComponents.components,
    ...fromServices.services,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
