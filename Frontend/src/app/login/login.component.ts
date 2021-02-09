import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // user = {
  //   uname: '',
  //   password: ''
  // };
  error: string = '';

 loginForm:FormGroup | any;
  constructor(
    private _auth: AuthService,
    private _router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      uname: ["",Validators.required],
      password: ["",Validators.required]
    });
  }
get f(){
  return this.loginForm.controls;
}
  loginUser() {
  this._auth.loginUser(this.loginForm.value).subscribe(
    (res)=>{
      localStorage.setItem('token',res.token);
      this._router.navigate(["admin/vaccination"]);
    }, err => {
      console.log(err); 
      this.error = err.error;
    })
  }
  
}
