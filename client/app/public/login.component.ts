import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LoginDetail, LoginService }  from './login.service';

@Component({
  templateUrl:'app/public/login.component.html',
  styleUrls:['app/public/login.component.css']
})

export class LoginComponent implements OnInit {
//  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

  loginData:LoginDetail =  new LoginDetail();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LoginService
  ) {}

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      //.switchMap((params: Params) => this.service.getHero(+params['id']))
     // .subscribe((hero: Hero) => this.hero = hero);
  }

login(){
    this.service.login(this.loginData).then(response => {
      if(response.status==='success'){
        this.router.navigate(['/success', "LOGINSUCC"]);
      }
    });
  }
  /*gotoHeroes() {
    //let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    //this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }*/
}
