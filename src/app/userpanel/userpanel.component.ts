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

  visits: Object;
  userData: ILoggedUser = this.dataService.sharedData;
  
  constructor(private dataService: DataService,
              private service: SharedService) { }
  
  ngOnInit(): void {
    this.refreshVisits()
    this.getServicee()
  }

  refreshVisits() {
    this.service.getVisits(this.userData.UserId).subscribe(res => this.visits = res )
  }

  getServicee() {
    this.service.getServices().subscribe(res => this.dataService.servicesData = res)
  }

  delVisit(visit_id) {
    this.service.delVisit(visit_id).subscribe(res => this.refreshVisits())
  }

}
