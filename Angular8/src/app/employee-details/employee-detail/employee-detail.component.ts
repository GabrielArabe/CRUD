import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from 'src/app/shared/employee-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { escapeRegExp } from '@angular/compiler/src/util';
import { ESex, sexName } from 'src/app/shared/employee-detail.model';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styles: []
})
export class EmployeeDetailComponent implements OnInit {

  public initialSex = null;
  public sex = sexName;
  enumKeys=[];

  constructor(private service: EmployeeDetailService,
    private toastr: ToastrService) {
      this.enumKeys = Object.keys(this.sex).filter(f => !isNaN(Number(f)));
     }


  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      ID: 0,      
      Name: "",
      LastName: "",
      Age: null,
      Sex: 0,
      BirthDate: null
    }
  }

  isEmptyOrSpaces(str: string){
    return !str || str.match(/^ *$/) !== null;
}

  onSubmit(form:NgForm){
    if(this.isEmptyOrSpaces(this.service.formData.Name)){
      return this.toastr.error('Enter your name', 'Employee Detail Register');
    }

    if (this.isEmptyOrSpaces(this.service.formData.LastName))
    {
      return this.toastr.error("Enter your last name", 'Employee Detail Register');
    }

    if (this.service.formData.Age == 0 || this.service.formData.Age == null)
    {
      return this.toastr.error("Enter your age", 'Employee Detail Register');
    } 
    
    if (this.service.formData.BirthDate == null)
    {
      return this.toastr.error("Enter your birthdate", 'Employee Detail Register');
    }

    if (this.service.formData.Name.length <= 3)
    {
      return this.toastr.error("Your name must be longer than 3 letters", 'Employee Detail Register');
    }
    if (this.service.formData.LastName.length <= 3)
    {
      return this.toastr.error("Your last name must be longer than 3 letters", 'Employee Detail Register');
    }

    if (this.service.formData.Sex==0){
      return this.toastr.error('Select your sex', 'Employee Detail Register');
    }
    if(this.service.formData.ID==0){
    this.insertRecord(form);
  }
  else{
    this.updateRecord(form);
  }
}

insertRecord(form:NgForm){

  this.service.postEmployeeDetail().subscribe(
    res => {
      this.resetForm(form);
      this.toastr.success('Submitted successfully', 'Employee Detail Register');
      this.service.refreshList();
    },
    err => {
      console.log(err);
    }
  )
}

updateRecord(form:NgForm){

  this.service.putEmployeeDetail().subscribe(
    res => {
      this.resetForm(form);
      this.toastr.info('Submitted successfully', 'Employee Detail Register');
      this.service.refreshList();
    },
    err => {
      console.log(err);
    }
  )
}

}
