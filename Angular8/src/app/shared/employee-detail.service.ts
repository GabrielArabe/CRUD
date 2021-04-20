import { Injectable } from '@angular/core';
import { EmployeeDetail, ESex } from './employee-detail.model';
import {HttpClient} from "@angular/common/http"


@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {
  formData: EmployeeDetail
  readonly rootUrl = 'http://localhost:29606/api';
  list: EmployeeDetail[];




  constructor(private http:HttpClient) {
    
   }

  postEmployeeDetail(){
    return this.http.post(this.rootUrl+'/EmployeeDetail', this.formData);
  }

  
  putEmployeeDetail(){
    return this.http.put(this.rootUrl+'/EmployeeDetail/'+ this.formData.ID, this.formData);
    }

  deleteEmployeeDetail(id: number){
      return this.http.delete(this.rootUrl+'/EmployeeDetail/'+ id);
      }

  refreshList(){
    this.http.get(this.rootUrl + '/EmployeeDetail')
    .toPromise()
    .then(res => this.list = res as EmployeeDetail[]);
  }


}


