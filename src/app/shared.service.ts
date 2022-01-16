import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = 'https://fryzjerprojekt.herokuapp.com/';

  constructor(private http:HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/user');
  }
  
  getUser(x: any) {
    return this.http.post(this.APIUrl + '/user', x);
  }

  addUser(x:any) {
    return this.http.post(this.APIUrl + '/register', x);
  }

  loginUser(x:any) {
    return this.http.post(this.APIUrl + '/login', x)
  }

  getVisits(id: number) {
    return this.http.get(this.APIUrl + '/visit/' + id)
  }

  getVisitsW(id: number) {
    return this.http.get(this.APIUrl + '/visitW/' + id)
  }

  addVisit(x:any) {
    return this.http.post(this.APIUrl + '/visit', x)
  }

  getServices() {
    return this.http.get(this.APIUrl + '/servicee')
  }

  delVisit(id: number) {
    return this.http.delete(this.APIUrl + '/visit/' + id)
  }
}
