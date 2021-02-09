import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { UserregistrationService } from '../userregistration.service';

@Component({
  selector: 'app-vaccinationlist',
  templateUrl: './vaccinationlist.component.html',
  styleUrls: ['./vaccinationlist.component.css']
})

export class VaccinationlistComponent implements OnInit {

  registers: any = [];
  status: string = 'registered';

  //create service object for calling getusers
  constructor(private userservice: UserregistrationService) {
    
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

  deleteuser(id: string) {
    if(confirm('Are you sure want to delete user?')) {
      this.userservice.deleteuser(id).subscribe((data) => {
        this.registers = this.registers.filter((p: any)=> p._id !== id);
      });
    }
  }
}
