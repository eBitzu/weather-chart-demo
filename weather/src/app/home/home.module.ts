import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    ChartsModule
  ],
  declarations: []
})
export class HomeModule { }
