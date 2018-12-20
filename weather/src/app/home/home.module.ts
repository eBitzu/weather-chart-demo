import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
import * as fromComponents from './components'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    ChartsModule,
    ReactiveFormsModule,
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components, ReactiveFormsModule ],
})
export class HomeModule { }
