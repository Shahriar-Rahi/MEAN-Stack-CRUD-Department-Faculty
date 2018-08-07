import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  selectedDepartment: Department;
  departments: Department[];
  readonly baseURL = 'https://mean-department-faculty-ru.herokuapp.com/departments';


  constructor(private http : HttpClient) { }
  postDepartment(emp : Department){
    return this.http.post(this.baseURL, emp);
  }
  getDepartmentList(){
    return this.http.get(this.baseURL);
  }

  putDepartment(emp : Department){
    return this.http.put(this.baseURL + '/${emp._id}', emp);
  }
  deleteDepartment(_id: string){
    return this.http.delete(this.baseURL + '/${_id}');
  }
}
