import { Injectable } from '@angular/core';
import '../../assets/smtpjs/smtp.js'; //file path may change → 
declare let Email: any;

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  server: any;
  constructor() {
    
  }
  sendMail() {
    interface EmailSendParams {
      Host: string;
      Username: string;
      Password: string;
      To: string;
      From: string;
      Subject: string;
      Body: string;
    }

    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'sumeshzoft@gmail.com',
      Password : 'F6AB8FD09FB397F581384FC783AC3B381CEB',
      To : 'sumeshzoft@gmail.com',
      From : 'udith.indrakantha@gmail.com',
      Subject : 'this.model.subject',
      Body : `
      <i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b> <br /> <b>Email: </b><br /> <b>Subject: End of Message.~</b> `
    } as EmailSendParams).then((message: string) => { alert(message); });
  }
}

