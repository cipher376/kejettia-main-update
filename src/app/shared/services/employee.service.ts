import { MyLocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MY_ACTION, SignalService } from './signal.service';
import { Employee, Account } from 'src/app/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private localStorage: MyLocalStorageService,
    private signal: SignalService,
    private http: HttpClient,
    private fstore: MyLocalStorageService,

  ) {
  }

  createUpdateEmployee(employee: Employee) {
    if (!employee || !employee.userId) {
      return;
    }
    if (employee.id) { // perform update
      const tempEmp = employee;
      delete employee.account;
      delete employee.user;
      return this.http.patch<Employee>(environment.employee_account_api_root_url + `/employees/${employee?.id}`, employee).pipe(
        map(res => {
          // console.log(res);
          return tempEmp as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Employee>(environment.employee_account_api_root_url + `/employees`, employee).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  createEmployeeAccount(employeeId: any, account: Account) {
    if (!employeeId || !account) {
      console.log('Employee or account is invalid');
      return;
    }
    const url = `${environment.employee_account_api_root_url}/employees/${employeeId}/account`
    return this.http.post<Account>(url, account).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getAllEmployee(skip = 0, limit = 1000, country?: string,
    state?: string, suburb?: string): any {
    const filter = <any>{
      order: 'id DESC',
      limit: limit,
      skip: skip,
      include: [
        {
          relation: 'account'
        }
      ]
    };

    const url = `${environment.employee_account_api_root_url}/employees/?filter=${JSON.stringify(filter)}`
    return this.http.get<Employee[]>(url).pipe(
      map((res: Employee[]) => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getEmployeeByUserId(userId: any) {
    const filter = <any>{
      where: {
        userId
      },
      include: [
        // {
        //   relation: 'myUser'
        // },
        {
          relation: 'account'
        }
      ]
    };
    const url = `${environment.employee_account_api_root_url}/employees/?filter=${JSON.stringify(filter)}`
    return this.http.get<Employee[]>(url).pipe(
      map((res: Employee[]) => {
        if (Array.isArray(res) && res.length > 0)
          return res[0];
        return;
      }),
      catchError(e => this.handleError(e))
    );
  }

  saveEmployeesLocal(employees: Employee[]) {
    this.localStorage.setObject('employees', employees).then(_ => {
      // console.log('Employees update on disk');
      this.signal.sendAction(MY_ACTION.employeesLoaded);
    });
  }

  async getEmployeesLocal() {
    return await this.localStorage.getObject('employees');
  }

  async setSelectedEmployeeLocal(employee: Employee) {
    return new Promise(resolve => {
      this.localStorage.setObject('selectedEmployee', employee).then(_ => {
        // console.log('selected employee update on disk');
        resolve(true);
      });
    });
  }
  async getSelectedEmployeeLocal() {
    return await this.localStorage.getObject('selectedEmployee');
  }
  handleError(e: any): any {
    console.log(e);
    const message = '';
    if (e.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', e.error.message);
      console.log('No connection');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${e.status}, ` + `body was: ${e.code}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('System error, please report to: admin@kejettia.com');
  }
}
