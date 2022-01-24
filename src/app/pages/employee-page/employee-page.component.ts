import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeUseCase } from 'src/app/core/useCase/employeeUseCase';



@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit {

  employees: Employee[] = [];
  search: string = ''
  totalEmployees: number = 0;
  totalSalario:number=0;

  constructor(private router: Router,
              private employeeUseCase :EmployeeUseCase) { }

  ngOnInit(): void {
    this.employeeUseCase.get().subscribe((result) => {
      console.log(result)
      if(result){
        this.employees = result;

        console.log(this.employees)

        this.totalSalario = this.employees.reduce((acc,obj,) => 
                            acc + (obj.salario ),0);


        this.totalEmployees =  this.employees.length;

      }
    });
  }

  goToCreate(){
    this.router.navigate(['/employee-create']);
  }

  goToSave(){
    
    console.log(this.search)

    this.employeeUseCase.createEmployees(this.employees).subscribe((result) => {
      console.log(result)
      if(result){
        this.employees = result;
        //console.log(this)
      }
    });

  }

  goToSearch(){

    console.log(this.search)

    this.employeeUseCase.getBySearch(this.search).subscribe((result) => {
      console.log(result)
      if(result){
        this.employees = result;
        
        this.totalSalario = this.employees.reduce((acc,obj,) => 
                            acc + (obj.salario ),0);


        this.totalEmployees =  this.employees.length;


      }
    });
  }

}