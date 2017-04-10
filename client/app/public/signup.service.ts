import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export class SignupDetail {
    constructor(public isOrganisation: boolean, public name: string, public email: string, public password: string, public contactNo: string, public industry: String, public employeeNo: string) { }
}


@Injectable()
export class SignupService {
    /* getHeroes() { return heroesPromise; }
 
     getHero(id: number | string) {
         return heroesPromise
             .then(heroes => heroes.find(hero => hero.id === +id));
     }*/
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private signupURL = 'api/public/signup';

    constructor(private http: Http) { }

    signUp(signupData: SignupDetail) : Promise<string>{
 const url = `${this.signupURL}`;
    return this.http
      .post(url, JSON.stringify(signupData), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as string)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
