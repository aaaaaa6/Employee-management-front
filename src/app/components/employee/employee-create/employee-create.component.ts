import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee} from '../../../core/models/employee'
import {  Observable } from 'rxjs';
import { EmployeeUseCase } from 'src/app/core/useCase/employeeUseCase';
import * as moment from 'moment';



@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {

  employeeForm: any;
  newEmployee!: Employee;
  state$!: Observable<object>;
  editEmployee!: Employee;

  panelInitialDataOpenState = false;
  panelManagementOpenState = true;

  constructor(private formBuilder: FormBuilder
    ,private router: Router
    ,private employeeUseCase: EmployeeUseCase
    ,public activatedRoute: ActivatedRoute ) {
    this.employeeForm = this.formBuilder.group({
        cedula:'',
        nombre:'',
        sexo:'',
        fechaNacimiento: new Date(),
        salario: 0,
        vacuna:'',
      });
  }

  ngOnInit(): void {

    // this.state$ = this.activatedRoute.paramMap
    // .pipe(map(() => window.history.state))

    // this.state$.subscribe((result)=>{
    //   if(result){
    //     this.editEmployee = result as Employee;
    //     this.employeeForm.controls['cedula'].setValue(this.editEmployee.cedula);
    //     this.employeeForm.controls['nombre'].setValue(this.editEmployee.nombre);
    //     this.employeeForm.controls['sexo'].setValue(this.editEmployee.sexo);
    //     this.employeeForm.controls['fechaNacimiento'].setValue(this.editEmployee.fechaNacimiento);
    //     this.employeeForm.controls['salario'].setValue(this.editEmployee.salario);
    //     this.employeeForm.controls['vacuna'].setValue(this.editEmployee.vacuna);
    //   }
    // })
  }

  createEmployee(){

    

    if(this.validate()){

    const fechaNacimiento = moment(this.employeeForm.value.fechaNacimiento).format('YYYY-MM-DD');
  
    this.newEmployee = {
      id:0,
      cedula: this.employeeForm.value.cedula,
      nombre: this.employeeForm.value.nombre,
      sexo: this.employeeForm.value.sexo,
      fechaNacimiento: fechaNacimiento,
      edad: calculoEdad(fechaNacimiento),
      salario: +this.employeeForm.value.salario,
      vacuna: this.employeeForm.value.vacuna
    }

    this.employeeUseCase.create(this.newEmployee).subscribe((resut)=>{
      if(resut){
        alert('Your request was successfully created')

        let resq = {
          id: +this.employeeForm.value.id,
          cedula: this.employeeForm.value.cedula,
          nombre: this.employeeForm.value.nombre,
          sexo: this.employeeForm.value.sexo,
          fechaNacimiento: fechaNacimiento,
          edad: calculoEdad(fechaNacimiento),
          salario: +this.employeeForm.value.salario,
          vacuna: this.employeeForm.value.vacuna,
        }

         this.router.navigate(['/employees'], { state: this.newEmployee });
        
         //this.router.navigateByUrl('/employees', { state: this.newEmployee });

      }
    })
      
    }
  }

  validate(){
   
    const fechaNacimiento = moment(this.employeeForm.value.fechaNacimiento).format('YYYY-MM-DD');
    var hoy = new Date();
    var cumpleanos = new Date(fechaNacimiento);

    //Calculamos años
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    if(edad < 18){
        alert('Employee must be over 18 years old')
        return false;
    }

    return true;
    
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
