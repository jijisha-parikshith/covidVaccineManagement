import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  loginUser(user: any) {
    return this.http.post<any>("http://localhost:3000/login", user)
  }
  loggedIn(){
 return !!localStorage.getItem("token")//to get the boolean value we use '!!' to check whether token is
  }
  getToken(){
    return localStorage.getItem("token")
  }
}

