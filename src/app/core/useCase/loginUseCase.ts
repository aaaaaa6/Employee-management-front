import { Injectable } from "@angular/core";
import { LoginService } from "src/app/services/login/login.service";
import { Employee } from "../models/employee";


@Injectable({
    providedIn: 'root'
})
export class LoginUseCase
{
    constructor(private services: LoginService){}

    public getPermissionsByRole(role: number) {
       
        return this.services.getPermissionsByRole(role);
    }

    public getRoleByUser(login: string, pass: string) {
       
        return this.services.getRoleByUser(login, pass);
    }

    public login(login: string, pass: string) {
       
        return this.services.login(login, pass);
    }

}