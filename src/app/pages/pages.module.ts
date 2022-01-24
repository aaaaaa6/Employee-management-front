import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTES } from './pages-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { PagesComponent } from './pages.component';
import { LoginModule } from '../components/login/login.module';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { MaterialModule } from '../shared/material/material.module';
import { EmployeeModule } from '../components/employee/employee.module';
import { LoadModule } from '../shared/load/load.module';
import {FormsModule} from '@angular/forms';




@NgModule({
  declarations: [
    LoginPageComponent,
    PagesComponent,
    EmployeePageComponent,
  ],
  imports: [
    PAGES_ROUTES,
    CommonModule,
    LoginModule,
    MaterialModule,
    EmployeeModule,
    LoadModule,
    FormsModule,
  ]
})
export class PagesModule { }
