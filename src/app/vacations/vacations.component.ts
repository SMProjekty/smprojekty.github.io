import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { CalendarService } from '../calendar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IWorker } from '../interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css'],
  providers: [DatePipe]
})
export class VacationsComponent {

  nowDate = new Date();
  shortDate;
  monthIndex;
  dateNav: string = '';
  workers!: IWorker[];
  vacations!: any;
  activeVacation!: number;
  addNewVacation!: FormGroup;
  updateVacation!: FormGroup;
  idToDel!: number;
  vacationIdToUpdate: number = 0;
  infoVacations!: any;

  modalData: any = {
    'worker': null,
    'date_fromm': null,
    'date_too': null,
  };


  constructor(private service: SharedService, private formBuilder: FormBuilder, private datePipe: DatePipe, private calendarService: CalendarService) {
    this.monthIndex = this.datePipe.transform(this.nowDate, 'M');
    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy');
    this.dateNav = this.calendarService.getMonthName(Number(this.monthIndex)-1) + ' ' + this.shortDate as string;
  }

  ngOnInit(): void {
    this.addNewVacation = this.formBuilder.group({
      worker: [null, Validators.required],
      date_from: [null, Validators.required],
      date_to: [null, Validators.required]
    });
    this.updateVacation = this.formBuilder.group({
      workerr: [null, Validators.required],
      date_fromm: [null, Validators.required],
      date_too: [null, Validators.required]
    });
    this.getWorkerList();
    this.getVacation(this.datePipe.transform(this.nowDate, 'yyyy-MM'));
  }

  getWorkerList() {
    this.service.listOfWorkers().subscribe((res: IWorker[]) => {
      this.workers = res;
    });
  }

  getVacation(date: any) {
    this.service.getVacation(date).subscribe(res => {
      this.vacations = res;
    });
  }

  vacationIdToModal(id: Number) {
    this.idToDel = Number(id);
  }

  // dataToModal(id: Number) {
  //   let index = this.vacations.findIndex((obj: { id: Number; }) => obj.id === id);
  //   this.updateVacation.get('workerr')?.setValue(this.vacations[index]['worker']);
  //   this.updateVacation.get('date_fromm')?.setValue(this.vacations[index]['datefrom']);
  //   this.updateVacation.get('date_too')?.setValue(this.vacations[index]['dateto']);
  //   this.vacationIdToUpdate = this.vacations[index]['id'];
  // }
  dataToModal(id: Number) {
    let index = this.vacations.findIndex((obj: { id: Number; }) => obj.id === id);
    //console.log(this.workers[index]);
    this.modalData['workerr'] = this.vacations[index]['worker'];
    this.modalData['date_fromm'] = this.vacations[index]['datefrom'];
    this.modalData['date_too'] = this.vacations[index]['dateto'];
    this.vacationIdToUpdate = this.vacations[index]['id'];
  }


  dateCount(type: boolean) {
    this.vacations = undefined;
    if(type)
      this.nowDate.setMonth(this.nowDate.getMonth() + 1);
    else
      this.nowDate.setMonth(this.nowDate.getMonth() - 1);
    this.monthIndex = this.datePipe.transform(this.nowDate, 'M');
    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy');
    this.dateNav = this.calendarService.getMonthName(Number(this.monthIndex)-1) + ' ' + this.shortDate as string;
    this.getVacation(this.datePipe.transform(this.nowDate, 'yyyy-MM'));
  }

  submitNewVacation() {
    var post_data = {
      "worker_id": this.addNewVacation.get('worker')?.value,
      "date_from": this.addNewVacation.get('date_from')?.value,
      "date_to": this.addNewVacation.get('date_to')?.value
    };
    this.service.addVacation(post_data).subscribe(res => {
      if(res =='Fields: worker cant be null.'){
        this.infoVacations = res;
        this.infoAlert('danger-alert-null');
      }
      if(res =='Fields: date_from and date_to cant be null.'){
        this.infoVacations = res;
        this.infoAlert('danger-alert-null');
      }
      if(res =='Employee is already on leave'){
        this.infoVacations = res;
        this.infoAlert('danger-alert-already');
      }
      if(res =='Leave added'){
        this.infoVacations = res;
        this.getVacation(this.datePipe.transform(this.nowDate, 'yyyy-MM'));
        this.infoAlert('success-alert-add');
      }
      if(res =='Critical Error'){
        this.infoVacations = res;
        this.infoAlert('danger-alert-null');
      }
    });
  }


  deleteVacation() {
    if (this.idToDel != undefined)
      this.service.deleteVacation(this.idToDel).subscribe(res => {
        if(res=='Successfully deleted vacation.')
        {
          this.getVacation(this.datePipe.transform(this.nowDate, 'yyyy-MM'));
          this.infoAlert('success-alert-delete');
        }
        if(res!='Successfully deleted vacation.'){
          this.getVacation(this.datePipe.transform(this.nowDate, 'yyyy-MM'));
          this.infoAlert('danger-alert-null');
        }
      });
  }

  submitUpdateVacation() {
    var post_data = {
      "worker_id": this.updateVacation.get('workerr')?.value,
      "date_from": this.updateVacation.get('date_fromm')?.value,
      "date_to": this.updateVacation.get('date_too')?.value
    };
    this.service.updateVacation(post_data, this.vacationIdToUpdate).subscribe(res => {

      if (res = "Fields: worker, date_from and date_to cant be null.")
        this.infoAlert('danger-alert-null');

      if (res = "Successfully updated vacation."){
        this.getVacation(this.datePipe.transform(this.nowDate, 'yyyy-MM'));
        this.infoAlert('success-alert-update');
      }
      if(res =='Critical Error'){
        this.infoVacations = res;
        this.infoAlert('danger-alert-null');
      }
      if(res =='Employee is already on leave'){
        this.infoVacations = res;
        this.infoAlert('danger-alert-already');
      }
    });
  }

  infoAlert(id: string) {
    document.getElementById(id)!.style.display = 'block';
    setTimeout(() => {
        document.getElementById(id)!.style.display = 'none';
    }, 3000);
  }

}
