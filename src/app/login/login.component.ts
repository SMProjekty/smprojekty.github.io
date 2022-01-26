import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { SharedService } from '../shared.service';
import { ILoggedUser } from './interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  currentUser:ILoggedUser[];

  constructor(private fb:FormBuilder,
              private service: SharedService,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      pass: ['', [ Validators.required ]]
    })
  }

  submitHandler() {
    var x = { Email: this.loginForm.get('email').value, Pass: this.loginForm.get('pass').value }
    this.service.login(x).subscribe(res => { 
        if (res != "Failed to Add") {
          var x = { UserId: res[0].UserId }
          this.service.auth(x).subscribe(res => {
            this.dataService.sharedData = res[0];
            console.log(this.dataService.sharedData)
            this.router.navigate(['../userpanel'])
          })
        } else {
          console.log('login error')
          this.loginForm.reset()
        }
      })
  }

}
