import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Employee } from 'src/app/core/models/employee';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = `${environment.host}${'/api/Employees'}`;

  constructor(private http: HttpClient) { }

  public get(): Observable<any> {
    return this.http.get<any>(this.url + '/GetEmployees', ).pipe(catchError(err => of(err)));
  }

  public create(employee: Employee): Observable<any> {
    return this.http.post<any>(this.url + '/InsertEmployee', employee, httpOptions).pipe(catchError(err => of(err)));
  }

  public createEmployees(employee: Employee[]): Observable<any> {
    return this.http.post<any>(this.url + '/InsertEmployees', employee, httpOptions).pipe(catchError(err => of(err)));
  }

  public getBySearch(search: string): Observable<any> {
    return this.http.get<any>(this.url + '/GetEmployeesBySearch?search='+ search ).pipe(catchError(err => of(err)));
  }

  public deleteEmployees(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/'+id).pipe(catchError(err => of(err)));
  }

  public editEmployees(id: number, employee: Employee ): Observable<any> {
    return this.http.put<any>(this.url + '/PutEmployee?id='+id, employee).pipe(catchError(err => of(err)));
  }


}
