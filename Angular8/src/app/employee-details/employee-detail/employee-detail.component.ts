import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from 'src/app/shared/employee-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styles: []
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private service: EmployeeDetailService,
    private toastr: ToastrService) { }

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
      Age: 0,
      Sex: 0,
      BirthDate: null
    }
  }

  onSubmit(form:NgForm){
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
