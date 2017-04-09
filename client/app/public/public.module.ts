import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { PublicRoutingModule } from './public-routing.module';

import { HomePageComponent }  from './homepage.component';
import { SignupComponent }   from './signup.component';
import { SignupService }   from './signup.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PublicRoutingModule
  ],
  declarations: [
    HomePageComponent,
    SignupComponent
  ],
  providers: [ SignupService ]
})
export class PublicModule { }
