import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl, Validators } from '@angular/forms';
import { User, LoginUser } from '../model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: ''
  };
  userName = new FormControl('', [Validators.required]);
  userPassword = new FormControl('', [Validators.required, Validators.minLength(0)]);
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.loginService.authenticate().subscribe((userResponse: LoginUser) => {
      if (this.loginService.checkIfUSerIsValid(this.user, userResponse)) {
        this.router.navigateByUrl('dashboard');
      }
    });
  }
  getErrorMessage() {
    return this.userName.hasError('required') ? 'You must enter a customer Number' :
      this.userPassword.hasError('minLength') ? 'You must enter a password' :
        '';
  }
}
