import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BeneficiaryListComponent } from './beneficiary-list/beneficiary-list.component';
import { HeaderComponent } from './header/header.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { VaccinationlistComponent } from './vaccinationlist/vaccinationlist.component';
import { EditVaccinelistComponent } from './edit-vaccinelist/edit-vaccinelist.component';
import { VaccinatedlistComponent } from './vaccinatedlist/vaccinatedlist.component';
import { EditbeneficiaryComponent } from './editbeneficiary/editbeneficiary.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthService} from './auth.service';
import {TokeninterceptorService} from './tokeninterceptor.service';
import { FooterComponent } from './footer/footer.component';
import { AddcentreComponent } from './addcentre/addcentre.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BeneficiaryListComponent,
    HeaderComponent,
    UserRegistrationComponent,
    VaccinationlistComponent,
    EditVaccinelistComponent,
    VaccinatedlistComponent,
    EditbeneficiaryComponent,
    HeaderUserComponent,
    FooterComponent,
    AddcentreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokeninterceptorService,
    multi:true//can handle multiple request
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
