import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared.service';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { MakevisitComponent } from './makevisit/makevisit.component';
import { DataService } from './data.service';
import { HistoryComponent } from './history/history.component';
import { AdminComponent } from './admin/admin.component';
import { AdminhistoryComponent } from './admin/adminhistory/adminhistory.component';
import { MakeuservisitComponent } from './admin/makeuservisit/makeuservisit.component';

@NgModule({
  declarations: [ AppComponent, RegisterComponent, MainComponent, LoginComponent, UserpanelComponent, MakevisitComponent, HistoryComponent, AdminComponent, AdminhistoryComponent, MakeuservisitComponent ],
  imports: [ BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
  providers: [SharedService, DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }