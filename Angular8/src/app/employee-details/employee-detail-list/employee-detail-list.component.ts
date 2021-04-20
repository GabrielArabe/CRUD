import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDetail, ESex} from 'src/app/shared/employee-detail.model';
import { EmployeeDetailService } from 'src/app/shared/employee-detail.service';


@Component({
  selector: 'app-employee-detail-list',
  templateUrl: './employee-detail-list.component.html',
  styles: []
})
export class EmployeeDetailListComponent implements OnInit {
 


  constructor(private service: EmployeeDetailService,
    private toastr: ToastrService) { 
           
    }


  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(ed: EmployeeDetail){
    this.service.formData = Object.assign({}, ed);
  }

  onDelete(ID){
    if(confirm("Are you sure to delete this record?")){
    this.service.deleteEmployeeDetail(ID)
    .subscribe(res => {
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'Employee Detail Register');
    },
      err=>{
        console.log(err)
      })
  }
}
}
