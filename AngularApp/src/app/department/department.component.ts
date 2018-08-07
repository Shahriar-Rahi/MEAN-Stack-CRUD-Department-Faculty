import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { DepartmentService } from '../shared/department.service'
import { Department } from '../shared/department.model';

declare var M: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DepartmentService]
})
export class DepartmentComponent implements OnInit {

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshDepartmentList();
  }
  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.departmentService.selectedDepartment = {
      _id: "",
      name: "",
      facultyName: "",
      location: "",
      numberOfStud: null,
      numberOfTea: null
    }
  }
  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.departmentService.postDepartment(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshDepartmentList();
        M.toast({html: 'Saved successfully', classes: 'rounded'});
      });
    }
    else{
      this.departmentService.putDepartment(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshDepartmentList();
        M.toast({html: 'Updated successfully', classes: 'rounded'});
      });
    }
  }
  refreshDepartmentList(){
    this.departmentService.getDepartmentList().subscribe((res)=>{
      this.departmentService.departments = res as Department[];
    });

  }

  onEdit(emp : Department){
    this.departmentService.selectedDepartment = emp;
  }

  onDelete(_id : string, form: NgForm){
    if(confirm('Are you sure to delete this record ?') == true){
      this.departmentService.deleteDepartment(_id).subscribe((res) => {
        this.refreshDepartmentList();
        this.resetForm(form);
        M.toast({html: 'Deleted successfully', classes: 'rounded'});
      });
    }
  }

}
