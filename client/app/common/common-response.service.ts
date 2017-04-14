import { Injectable } from '@angular/core';

@Injectable()
export class CommonResponseService {
   private messageMap : Map<String, String>= new Map<String, String>();
   constructor() { 
       this.messageMap.set("SIGNSUCC","You are registered successfully. A verification mail has been send to your registered emailId")
   }
   
   getMessage(code:String){
       return this.messageMap.get(code);
   }
}
