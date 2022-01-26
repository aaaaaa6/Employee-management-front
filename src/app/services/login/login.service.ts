import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = `${environment.host}${'/api/Users'}`;

  constructor(private http: HttpClient) { }


  public login(login: string, pass:string): Observable<any> {
    const body ={login,pass }
    console.log(body)
    return this.http.post<any>(this.url + '/login?credenciales='+login+','+pass, httpOptions).pipe(catchError(err => of(err)));
  }



  public getPermissionsByRole(role: number): Observable<any> {
    return this.http.post<any>(this.url + '/GetPermissionsByRole?roleId='+ role , httpOptions).pipe(catchError(err => of(err)));
  }

  public getRoleByUser(login: string, pass:string): Observable<any> {
    return this.http.get<any>(this.url + '/GetRoleByUser?login= '+ login +';pass='+pass ).pipe(catchError(err => of(err)));
  }


}