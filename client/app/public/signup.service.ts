import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export class SignupDetail {
    public isOrganisation: boolean;
    public orgName: string;
    public cnctName: string;
    public userName: string;
    public emailId: string;
    public password: String;
    public cnctNo: String;
    constructor() { }
}


@Injectable()
export class SignupService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private signupURL = 'api/public/signup';

    constructor(private http: Http) { }

    signUp(signupData: SignupDetail): Promise<any> {
        const url = `${this.signupURL}`;
        return this.http
            .post(url, JSON.stringify(signupData), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
