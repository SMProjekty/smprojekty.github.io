import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { DataService } from 'src/app/data.service';
import { TouchSequence } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-makeuservisit',
  templateUrl: './makeuservisit.component.html',
  styleUrls: ['./makeuservisit.component.css']
})
export class MakeuservisitComponent implements OnInit {

  services: any = this.dataService.servicesData
  visitFormA: FormGroup
  currentUser: any;

  constructor(private fb: FormBuilder,
              private service: SharedService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.getServices()
    this.visitFormA = this.fb.group({
      name: ['', [ Validators.required ]],
      lastname: ['', [ Validators.required ]],
      hour: ['', [ Validators.required ]],
      date: ['', [ Validators.required ]],
      type: ['', [ Validators.required ]],
      status: ['N', [ Validators.required ]]
    })
  }

  submitHandler() {
    var x = { Name: this.visitFormA.get('name').value,
              LastName: this.visitFormA.get('lastname').value };
    this.service.getUser(x).subscribe(res => {
      if (res != 'Failed Search') {
        this.currentUser = res
        this.addVisitt()
      } else {
        console.log("error")
    }})
  }

  getServices() {
    this.service.getServices().subscribe(res => this.services = res )
  }

  addVisitt() {
    var y = { userr: this.currentUser[0].UserId,
              servicee: this.visitFormA.get('type').value,
              Ddate: this.visitFormA.get('date').value,
              Hhour: this.visitFormA.get('hour').value,
              Status: this.visitFormA.get('status').value };
    this.service.addVisit(y).subscribe(res2 => {
      console.log(y)
      if (res2 != 'Failed to Add')
        this.router.navigate(['../adminpanel'])
      else
        console.log(res2)
        this.visitFormA.reset()
    })
  }
}
