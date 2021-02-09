import { Component, OnInit } from '@angular/core';
import { UserregistrationService } from '../userregistration.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  registrationForm: FormGroup | any;
  success: boolean =  false;
  constructor(
    private userservice: UserregistrationService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
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
      district: [null, Validators.required]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  reset() {
    this.registrationForm.reset();
  }

  register(): any {
    this.success = false;
    if (this.registrationForm.invalid) return false;

    this.userservice.addUsers(this.registrationForm.value).subscribe((res: any) => {
      console.log("register", res);
      this.reset();
      this.success = true;
    });


    // if (this.success) {
    //   alert("You have registered succefully!You will get an email regarding the date of vaccination");
    //   this.router.navigate(['/']);
    // } else { alert("error") }
  }
}
