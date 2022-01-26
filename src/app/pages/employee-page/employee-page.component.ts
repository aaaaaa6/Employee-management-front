import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  newEmployees: Employee[] = [];
  search: string = ''
  totalEmployees: number = 0;
  totalSalario:number=0;

  constructor(private router: Router,
              private employeeUseCase :EmployeeUseCase,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    
    this.rowsInit();

  }

  rowsInit(){

    this.employeeUseCase.get().subscribe((result) => {
      if(result){
        this.employees = result;
      
        this.employees.map(function(dato){
          if(dato){
            dato.edad = calculoEdad(dato.fechaNacimiento)
          }
        });

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
    
    
    this.employeeUseCase.createEmployees(this.employees).subscribe((result) => {
      console.log(result)
      if(result){

        this.employees.map(function(dato){
          if(dato){
            dato.edad = calculoEdad(dato.fechaNacimiento)
          }
        });
      }
    });

  }

  goToSearch(){

    console.log(this.search)

    this.employeeUseCase.getBySearch(this.search).subscribe((result) => {
      console.log(result)
      if(result){
        this.employees = result;

        this.employees.map(function(dato){
          if(dato){
            dato.edad = calculoEdad(dato.fechaNacimiento)
          }
        });
        
        this.totalSalario = this.employees.reduce((acc,obj,) => 
                            acc + (obj.salario ),0);

        this.totalEmployees =  this.employees.length;

      }
    });
  }

  executeTotalSalario(salario: number){
      this.totalSalario = salario
  }

  executeTotalEmployees(employes: number){
    this.totalEmployees = employes;
  }

  executeNewEmployees(newEmploye: Employee){
    this.newEmployees.push(newEmploye)
    console.log(this.employees);
    console.log(this.newEmployees);
    this.changeDetectorRefs.detectChanges();
  }

}

function calculoEdad(fechaNacimiento: string): string {
  var hoy = new Date();
    var cumpleanos = new Date(fechaNacimiento);

    //Calculamos años
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    // calculamos los meses
    var meses=0;
    if(hoy.getMonth()>cumpleanos.getMonth()){
        meses=hoy.getMonth()-cumpleanos.getMonth();
    }else if(hoy.getMonth()<cumpleanos.getMonth()){
        meses=12-(cumpleanos.getMonth()-hoy.getMonth());
    }else if(hoy.getMonth()==cumpleanos.getMonth() && hoy.getDate()>cumpleanos.getDate() ){
        if(hoy.getMonth()-cumpleanos.getMonth()==0){
            meses=0;
        }else{
            meses=11;
        }     
    }
    // Obtener días: día actual - día de cumpleaños
    let dias  = hoy.getDate() - cumpleanos.getDate();
    if(dias < 0) {
        meses = (meses - 1 < 0) ? 11 : meses - 1;
        dias = 30 + dias;
    }

    return (`${edad} años, ${meses} meses, ${dias} días`);
}