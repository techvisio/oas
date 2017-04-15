import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export class SignupDetail {
    public isOrganisation: boolean;
    public orgName: string;
<<<<<<< HEAD
    public name: string;
    public userName: string;
    public password: string;
    public emailId: String;
    public contactNo: string
    constructor() {

    }
=======
    public cnctName: string;
    public userName: string;
    public emailId: string;
    public password: String;
    public cnctNo: String;
    constructor() { }
>>>>>>> f93cf275919968aa2740333f79b4ededf6a5cd5b
}


@Injectable()
export class SignupService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private signupURL = 'api/public/signup';

    constructor(private http: Http) { }

<<<<<<< HEAD
    signUp(signupData: SignupDetail): Promise<string> {
=======
    signUp(signupData: SignupDetail): Promise<any> {
>>>>>>> f93cf275919968aa2740333f79b4ededf6a5cd5b
        const url = `${this.signupURL}`;
        return this.http
            .post(url, JSON.stringify(signupData), { headers: this.headers })
            .toPromise()
<<<<<<< HEAD
            .then(res => res.json().data as string)
=======
            .then(res => res.json())
>>>>>>> f93cf275919968aa2740333f79b4ededf6a5cd5b
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
