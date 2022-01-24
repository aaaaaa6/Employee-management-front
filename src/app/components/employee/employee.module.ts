import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    EmployeeListComponent,
  ]
})
export class EmployeeModule { }
