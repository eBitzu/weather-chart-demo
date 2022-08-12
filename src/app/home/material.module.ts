import { NgModule } from '@angular/core';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
