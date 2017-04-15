import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export class SignupDetail {
    public isOrganisation: boolean;
    public orgName: string;
    public name: string;
    public userName: string;
    public password: string;
    public emailId: String;
    public contactNo: string
    constructor() {

    }
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

    signUp(signupData: SignupDetail): Promise<string> {
        const url = `${this.signupURL}`;
        return this.http
            .post(url, JSON.stringify(signupData), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as string)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
