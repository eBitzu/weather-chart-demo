import { NgModule } from '@angular/core';
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  exports: [
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  declarations: [],
})
export class MyMaterialModule {}
