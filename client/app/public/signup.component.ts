import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SignupDetail, SignupService }  from './signup.service';

@Component({
  templateUrl:'app/public/signup.component.html'
})

export class SignupComponent implements OnInit {
//  @HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display')   display = 'block';
  //@HostBinding('style.position')  position = 'absolute';

  signupData: SignupDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SignupService
  ) {}

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      //.switchMap((params: Params) => this.service.getHero(+params['id']))
     // .subscribe((hero: Hero) => this.hero = hero);
  }

signup(){
    this.service.signUp(this.signupData);
  }
  /*gotoHeroes() {
    //let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    //this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }*/
}
