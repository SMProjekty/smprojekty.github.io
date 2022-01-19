import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-adminhistory',
  templateUrl: './adminhistory.component.html',
  styleUrls: ['./adminhistory.component.css']
})
export class AdminhistoryComponent implements OnInit {

  visits: any

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.showVisits()
  }

  showVisits() {
    this.service.getAllVisits().subscribe(res => this.visits = res)
  }

  changeStatus(id: number) {
    this.service.changeStatus(id, {Status: 'W'}).subscribe(res => {
      console.log(res)
      this.showVisits()
    })
  }

}
