import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserregistrationService } from '../userregistration.service';

@Component({
  selector: 'app-edit-vaccinelist',
  templateUrl: './edit-vaccinelist.component.html',
  styleUrls: ['./edit-vaccinelist.component.css']
})
export class EditVaccinelistComponent implements OnInit {

  editUserForm: FormGroup | any;
  userId: string = '';
  success: boolean = false;
  centres: any[] = [];

  constructor(
    private userservice: UserregistrationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]
      ],
      dob: ['', Validators.required],
      gender: [null, Validators.required],
      aadhar: ['', [
        Validators.required,
        Validators.pattern("^[0-9]{16}$")]
      ],
      userType: [null, Validators.required],
      address: ['', Validators.required],
      district: [null, Validators.required],
      vaccinationCentre: [null,Validators.required], 
      vaccinationDate: [null,Validators.required], 
      status: [null]
    });

    this.route.params.subscribe(param => {
      console.log(param);
      this.userId = param.id;
      this.getUser();
    });
  }

  getUser(){
    this.userservice.getUser(this.userId).subscribe((res:any) => {
      console.log(res);
      delete res._id;
      delete res.__v;
      this.editUserForm.setValue(res);
      this.getCentres(res.district);
    });
  }
  getCentres(district: string){
    this.userservice.getCentres(district).subscribe((res:any) => {
      console.log(res);
      this.centres = res;
    });
  }

  changeDistrict(event: any) {
    console.log(event.target.value);
    if(event.target.value)
      this.getCentres(event.target.value);
  }

  get f() {
    return this.editUserForm.controls;
  }

  updateUser(): any {
    this.success = false;
    if (this.editUserForm.invalid) return false;

    this.userservice.editUser(this.editUserForm.value, this.userId).subscribe((res: any) => {
      console.log("register", res);
      this.success = true;
      this.router.navigate(['/admin/beneficiary']);
    });
  }

}
