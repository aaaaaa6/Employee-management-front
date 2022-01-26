import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUseCase } from 'src/app/core/useCase/loginUseCase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
   mensaje:string ='';
  

  
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  invalidLogin: boolean = false;

  constructor(private router: Router
              ,private loginUseCase: LoginUseCase) { }

  ngOnInit(): void {

      localStorage.removeItem("jwt");

  }


  submit() {
    if (this.form.valid) {
      console.log(this.form.value)
      this.submitEM.emit(this.form.value);


      this.loginUseCase.login(this.form.controls['username'].value, this.form.controls['password'].value).subscribe((resut)=>{
        if(resut.status==401){  

          this.invalidLogin = true;

        }else{

          const token = resut.token;
          console.log(token)
          localStorage.setItem("jwt", token);
          this.invalidLogin = false;
          this.router.navigate(["/employees"]);

        }
      });

      //this.router.navigate(['/employees']);
    }  
  }


  


}

