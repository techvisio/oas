import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { CommonRoutingModule } from './common-routing.module';

import { CommonResponseComponent }  from './common-response.component';
import {CommonResponseService} from './common-response.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonRoutingModule
  ],
  declarations: [
    CommonResponseComponent
  ],
  providers: [ CommonResponseService ]
})
export class CommonModule { }
