import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    LoadSpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    LoadSpinnerComponent
  ]
})
export class LoadModule { }
