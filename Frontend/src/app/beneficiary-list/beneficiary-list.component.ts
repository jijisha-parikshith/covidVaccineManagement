import { Component, OnInit } from '@angular/core';
import { UserregistrationService } from '../userregistration.service';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.css']
})
export class BeneficiaryListComponent implements OnInit {

  registers: any = [];
  status: string = 'beneficiary';
  success: boolean = false;

  //create service object for calling getusers
  constructor(
    private userservice: UserregistrationService
  ) {
    
  }
  //call functions getUsers to get the data inside an array here
  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(event?: any) {//event(parameter) optional
    let option = `?status=${this.status}`;
    if(event && event.target.value !== "null"){
      console.log(event.target.value);
      option += `&userType=${event.target.value}`; 
    }
    
    this.userservice.getUsers(option).subscribe((data) => {
      this.registers = JSON.parse(JSON.stringify(data));
    });
  }

  makeVaccinated(id: string) {
    this.userservice.makeVaccinated(id).subscribe((res: any) => {
      this.success = true;
      this.getUserList();
    });
  }

  deleteuser(id: string) {
    if(confirm('Are you sure want to delete user?')) {
      this.userservice.deleteuser(id).subscribe((data) => {
        this.registers = this.registers.filter((p: any)=> p._id !== id);
      });
    }
  }

}
