import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userModel: User;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  validateUserLogin(username, password) {
    if (username == "admin" && password == "admin") {
      this.router.navigate(["/dashboard"], { relativeTo: this.route });
    }
  }
}
