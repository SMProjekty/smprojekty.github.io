import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { SharedService } from '../shared.service';
import { ILoggedUser } from '../login/interface';

@Component({
  selector: 'app-makevisit',
  templateUrl: './makevisit.component.html',
  styleUrls: ['./makevisit.component.css']
})
export class MakevisitComponent implements OnInit {

  visitForm: FormGroup;
  services: any = this.dataService.servicesData;
  radioValue:number = null
  userData: ILoggedUser = this.dataService.sharedData;

  constructor(private fb: FormBuilder,
              private service: SharedService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      hour: ['', [ Validators.required ]],
      date: ['', [ Validators.required ]],
      type: ['', [ Validators.required ]],
      status: ['N', [ Validators.required ]]
    })
  }

  submitHandler() {
    var x = { UserId: this.userData.UserId,
              ServiceeId: this.visitForm.get('type').value,
              Ddate: this.visitForm.get('date').value,
              Hhour: this.visitForm.get('hour').value,
              Status: this.visitForm.get('status').value };
    this.service.addVisit(x).subscribe(res => {
      if (res != 'Failed to Add')
        this.router.navigate(['../userpanel'])
      else {
        console.log('register error')
        this.visitForm.reset()
      }
    })
  }
}
