import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './signup.component';
import {HomePageComponent} from './homepage.component';


const publicRoutes: Routes = [
  { path: "signup",  component: SignupComponent},
   { path: "home",  component: HomePageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(publicRoutes,{ useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class PublicRoutingModule { }
