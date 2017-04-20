import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './signup.component';
import {HomePageComponent} from './homepage.component';
import {LoginComponent} from './login.component';

const publicRoutes: Routes = [
  { path: "signup",  component: SignupComponent},
   { path: "home",  component: HomePageComponent},
   { path: "login",  component: LoginComponent}
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
