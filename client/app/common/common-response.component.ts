import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CommonResponseService} from './common-response.service';


@Component({
  templateUrl:'app/common/common-response.component.html',
  styleUrls:['app/common/common-response.component.css']
})

export class CommonResponseComponent implements OnInit {
 // @HostBinding('@routeAnimation') routeAnimation = true;
 // @HostBinding('style.display')   display = 'block';
 // @HostBinding('style.position')  position = 'absolute';

  msg: String="";
  code: String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonResponseService: CommonResponseService
  ) {}

  ngOnInit() {
  this.route.params.subscribe(params => {
       this.code=params['code'];
    });
    this.msg=this.commonResponseService.getMessage(this.code);
    console.log(this.msg);
  }

}
