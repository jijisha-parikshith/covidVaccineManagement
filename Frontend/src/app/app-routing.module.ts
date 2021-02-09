import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcentreComponent } from './addcentre/addcentre.component';
import {AuthGuard} from "./auth.guard";
import { BeneficiaryListComponent } from './beneficiary-list/beneficiary-list.component';
import { EditVaccinelistComponent } from './edit-vaccinelist/edit-vaccinelist.component';
import { EditbeneficiaryComponent } from './editbeneficiary/editbeneficiary.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { VaccinatedlistComponent } from './vaccinatedlist/vaccinatedlist.component';
import { VaccinationlistComponent } from './vaccinationlist/vaccinationlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'admin/beneficiary', canActivate:[AuthGuard],component: BeneficiaryListComponent},
  { path: 'registration', component: UserRegistrationComponent},
  { path: 'login', component: LoginComponent},
  {path:"admin/vaccination",canActivate:[AuthGuard],component:VaccinationlistComponent},
  { path: 'admin/vaccination/edit/:id',canActivate:[AuthGuard], component: EditVaccinelistComponent},
  {path:"vaccinatedlist",canActivate:[AuthGuard],component:VaccinatedlistComponent},
  {path:"admin/vaccination/editbeneficiary",canActivate:[AuthGuard],component:EditbeneficiaryComponent},
  {path:"admin/addcentre",canActivate:[AuthGuard],component:AddcentreComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
