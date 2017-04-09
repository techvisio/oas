import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }  from './app.component';
import { PublicModule } from './public/public.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)],
    PublicModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
