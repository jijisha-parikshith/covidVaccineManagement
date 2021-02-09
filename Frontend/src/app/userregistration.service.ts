import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserregistrationService {
  
  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient ) {}

    getUsers(option: string){
      return this.http.get(`${this.baseUrl}/registers` + option);
    }
    
    makeVaccinated(id: string){
      return this.http.put(`${this.baseUrl}/makeVaccinated`, {id});
    }

    getUser(id: string){
      return this.http.get(`${this.baseUrl}/getUser/${id}`);
    }

    editUser(data: any, id: string) {
      return this.http.put(`${this.baseUrl}/editUser/${id}`, data);
    }

    addUsers(data:any){
      return this.http.post(`${this.baseUrl}/insert`, data)
    }
    deleteuser(id:any){
      return this.http.delete(`${this.baseUrl}/remove/${id}`)
    }
    getCentres(district: string){
      return this.http.get(`${this.baseUrl}/getCentres/${district}`);
    }
    addcentre(centre:any){
      return this.http.post(`${this.baseUrl}/addcentre`,centre);
    }
  }