import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { LoginService } from './services/login.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import {  HttpClientModule } from '@angular/common/http';
import { NewtransactionsComponent } from './dashboard/newtransactions/newtransactions.component';
import { ViewtransactionsComponent } from './dashboard/viewtransactions/viewtransactions.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    NewtransactionsComponent,
    ViewtransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [LoginService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
