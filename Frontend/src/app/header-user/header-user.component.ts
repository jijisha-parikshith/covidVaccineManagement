import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  constructor(public _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  logoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["login"]);
  }
}
