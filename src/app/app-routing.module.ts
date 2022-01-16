import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { MakevisitComponent } from './makevisit/makevisit.component';
import { HistoryComponent } from './history/history.component';
import { AdminComponent } from './admin/admin.component';
import { MakeuservisitComponent } from './admin/makeuservisit/makeuservisit.component';
import { AdminhistoryComponent } from './admin/adminhistory/adminhistory.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userpanel', component: UserpanelComponent},
  {path: 'makevisit', component: MakevisitComponent},
  {path: 'visithistory', component: HistoryComponent},
  {path: 'adminpanel', component: AdminComponent},
  {path: 'makeuservisit', component: MakeuservisitComponent},
  {path: 'adminhistory', component: AdminhistoryComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
