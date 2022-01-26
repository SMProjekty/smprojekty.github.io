import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = 'https://fryzjerprojekt.herokuapp.com';
  // readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http:HttpClient) { }
  
  registerLogin(x: any) { return this.http.post(this.APIUrl + '/registerlogin', x); }
  register(y: any)      { return this.http.post(this.APIUrl + '/register', y); }
  login(x: any)         { return this.http.post(this.APIUrl + '/login', x); }
  auth(x: any)          { return this.http.post(this.APIUrl + '/auth', x); }
  visits(x: any)        { return this.http.post(this.APIUrl + '/nextvisit', x); }
  visitsw(id: number)   { return this.http.get(this.APIUrl + '/visitW/' + id +'/'); }
  makevisit(x: any)     { return this.http.post(this.APIUrl + '/visit', x); }
  services()            { return this.http.get(this.APIUrl + '/servicee'); }
  visitsall()           { return this.http.get(this.APIUrl + '/vall'); }
  changeStatus(id: number, x: any) { return this.http.put(this.APIUrl + '/visit/' + id + '/', x); }
  delVisit(id: number)  { return this.http.delete(this.APIUrl + '/visit/' + id); }
  getUser(x: any)       { return this.http.post(this.APIUrl + '/customerunr', x); }
  checkdate(x: any)     { return this.http.post(this.APIUrl + '/checkdate', x); }
}
