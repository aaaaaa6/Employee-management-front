import { Injectable } from "@angular/core";
import { EmployeeService } from "../../services/employee/employee.service";
import { Employee } from "../models/employee";


@Injectable({
    providedIn: 'root'
})
export class EmployeeUseCase
{
    constructor(private services: EmployeeService){}

    public get() {
       
        return this.services.get();
    }

    public create(employee: Employee) {
       
        return this.services.create(employee);
    }
    public createEmployees(employee: Employee[]) {
       
        return this.services.createEmployees(employee);
    }

    public getBySearch(search: string) {
       
        return this.services.getBySearch(search);
    }

    public deleteEmployee(id:number) {
       
        return this.services.deleteEmployees(id);
    }

    public editEmployees(employee: Employee ) {
       
        return this.services.editEmployees(employee);
    }

    public ValidateEmployees() {
        return true
    }

}