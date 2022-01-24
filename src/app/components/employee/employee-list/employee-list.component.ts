import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeUseCase } from 'src/app/core/useCase/employeeUseCase';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['cedula', 'nombre', 'sexo', 
                                'fechaNacimiento', 'edad',
                                'salario','vacuna','acciones'];

  @Input() set dataSourceEmployee(DataEmployee: Employee[]){
    this.dataSource.data = DataEmployee
    console.log(this.rowTableEmployee)
  }

   //@Input() dataSourceEmployee:Employee[]=[];

  state$!: Observable<object>;
  rowTableEmployee: Employee[] =[];
  dataSource = new MatTableDataSource<Employee>([]);
  newRowEmployee!: Employee;
  
  constructor(public activatedRoute: ActivatedRoute
              ,private router: Router
              ,private employeeUseCase :EmployeeUseCase
              ,private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {

    this.state$ = this.activatedRoute.paramMap
    .pipe(map(()=>window.history.state))

    this.state$.subscribe((result)=>{
      if(result){

        this.newRowEmployee = result as Employee
        
        const newRow: Employee ={
          id:0,
          cedula: this.newRowEmployee.cedula,
          nombre: this.newRowEmployee.nombre,
          sexo: this.newRowEmployee.sexo,
          fechaNacimiento: this.newRowEmployee.fechaNacimiento,
          edad: this.newRowEmployee.edad,
          salario: this.newRowEmployee.salario,
          vacuna: this.newRowEmployee.vacuna,
        }
        

        console.log(newRow)
        this.rowTableEmployee.push(newRow)
        //this.dataSourceEmployee.push(newRow);
        this.dataSource.data = this.rowTableEmployee
        console.log(this.rowTableEmployee)
      }
    })

  }

  editEmployee(employee :Employee){
    console.log(employee);

    this.router.navigateByUrl('/employee-edit', { state: employee });

  }

  deleteEmployee(employee :Employee){
  
    this.employeeUseCase.deleteEmployee(employee.id).subscribe((result) => {
      console.log(result)
      if(result){
      }
    });

    this.dataSource.data.splice(this.dataSource.data.indexOf(employee),1)
    this.dataSource.data = this.dataSource.data

  }

}