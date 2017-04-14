import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonResponseComponent} from './common-response.component';


const commonRoutes: Routes = [
  { path: "success/:code",  component: CommonResponseComponent},
   { path: "error/:code",  component: CommonResponseComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(commonRoutes,{ useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class CommonRoutingModule { }
