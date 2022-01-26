import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ILoggedUser } from '../login/interface';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css'],
})
export class UserpanelComponent implements OnInit {

  visits: any;
  userData: ILoggedUser = this.dataService.sharedData;
  sum: number = 0;
  
  constructor(private dataService: DataService,
              private service: SharedService) { }
  
  ngOnInit(): void {
    this.refreshVisits()
    this.getServicee()
  }

  refreshVisits() {
    this.service.visits({ CustomerId: this.userData.CustomerId }).subscribe(res => {
      this.visits = res 
      console.log(this.visits)
      let a = 0
      this.sum = 0
      while(this.visits[a].servicee.Price != undefined) {
        this.sum += this.visits[a].servicee.Price
        a++
      }
    }) 
  }

  getServicee() {
    this.service.services().subscribe(res => this.dataService.servicesData = res)
  }

  delVisit(visit_id) {
    this.service.delVisit(visit_id).subscribe(res => this.refreshVisits())
  }

}
