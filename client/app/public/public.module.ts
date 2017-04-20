import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { PublicRoutingModule } from './public-routing.module';

import { HomePageComponent }  from './homepage.component';
import { SignupComponent }   from './signup.component';
import { SignupService }   from './signup.service';
import {LoginComponent} from './login.component';
import {LoginService} from './login.service'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PublicRoutingModule
  ],
  declarations: [
    HomePageComponent,
    SignupComponent,
    LoginComponent
  ],
  providers: [ SignupService,LoginService ]
})
export class PublicModule { }
