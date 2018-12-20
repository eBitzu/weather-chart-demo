import { NgModule } from '@angular/core';
import {
  MatCheckboxModule,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatSelectModule,
  ],
  exports: [
    MatCheckboxModule,
    MatSelectModule,
  ],
  declarations: []
})
export class MyMaterialModule { }
