import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserregistrationService } from '../userregistration.service';
@Component({
  selector: 'app-addcentre',
  templateUrl: './addcentre.component.html',
  styleUrls: ['./addcentre.component.css']
})
export class AddcentreComponent implements OnInit {

  addCentreForm: FormGroup | any;
  added: boolean = false;

  constructor(
    private userService: UserregistrationService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.addCentreForm = this.fb.group({
      district: [null, Validators.required],
      centre: ["", Validators.required]
    });
  }
  get f() {
    return this.addCentreForm.controls;
  }
  reset() {
    this.addCentreForm.reset();
  }
  addcentre(): any {
    this.added = false;
    if (this.addCentreForm.invalid) return false;
    this.userService.addcentre(this.addCentreForm.value).subscribe((res: any) => {
      console.log(this.added);
      console.log("addcentre", res);
     this.reset();
      this.added = true;
    });

  }

}
