//import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PagesComponent } from './pages.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { EmployeeCreateComponent } from '../components/employee/employee-create/employee-create.component';
import { EmployeeEditComponent } from '../components/employee/employee-edit/employee-edit.component';
import { AuthGuardService as AuthGuard } from '../services/security/auth-guard.service';


const pagesRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent },
  {
    path: '', component: PagesComponent, 
    children: [
      { path: 'employees', component: EmployeePageComponent, canActivate:[AuthGuard],  data: {permissions: 'EMPLOYEE_LIST'} },
      { path: 'employee-create', component: EmployeeCreateComponent, canActivate:[AuthGuard], data: {permissions: 'EMPLOYEE_CREATE'} },
      { path: 'employee-edit', component: EmployeeEditComponent, canActivate:[AuthGuard], data: {permissions: 'EMPLOYEE_EDIT'} },
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
