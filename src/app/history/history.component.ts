import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ILoggedUser } from '../login/interface';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  visitsW: any
  services: any = this.dataService.servicesData
  userData: ILoggedUser = this.dataService.sharedData

  constructor(private dataService: DataService,
              private service: SharedService) { }

  ngOnInit(): void {
    this.showPastVisits()
  }

  showPastVisits() {
    this.service.getVisitsW(this.userData.UserId).subscribe(res => {
      this.visitsW = res
    })
  }
}
