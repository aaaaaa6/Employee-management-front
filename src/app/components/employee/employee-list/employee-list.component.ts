import { ChangeDetectorRef, Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
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
  }

   //@Input() dataSourceEmployee:Employee[]=[];

  state$!: Observable<object>;
  rowTableEmployee: Employee[] =[];
  dataSource = new MatTableDataSource<Employee>([]);


  newRowEmployee!: Employee;

  totalSalario : number = 0;
  totalEmployees: number = 0;
  @Output() accionTotalSalario = new EventEmitter<number>();
  @Output() accionTotalEmployees = new EventEmitter<number>();
  @Output() accionNewEmployees = new EventEmitter<Employee>();
  
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

        if(this.newRowEmployee.cedula){
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
         
   
          this.accionNewEmployees.emit(newRow);

          this.dataSource = new MatTableDataSource<Employee>(this.rowTableEmployee);

        }  
      }
    })

  }

  editEmployee(employee :Employee){
    console.log(employee);

    this.router.navigate(['/employee-edit'], { state: employee });

  }

  deleteEmployee(employee :Employee){
  
    this.employeeUseCase.deleteEmployee(employee.id).subscribe((result) => {
      console.log(result)
      if(result){

        this.dataSource.data.splice(this.dataSource.data.indexOf(employee),1)
        this.dataSource.data = this.dataSource.data
    
        this.totalSalario = this.dataSource.data.reduce((acc,obj,) => 
                                acc + (obj.salario ),0);

        this.totalEmployees =  this.dataSource.data.length;
        
        this.accionTotalSalario.emit(this.totalSalario);
        this.accionTotalEmployees.emit(this.totalEmployees);

      }
    });

    

  }

}