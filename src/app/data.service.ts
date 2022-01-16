import { Injectable } from "@angular/core";
import { ILoggedUser } from "./login/interface";


@Injectable()
export class DataService {
   public sharedData: ILoggedUser
   public servicesData: any
}