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

  /**
   * Authenticates the user and navigates to the dashboard page
   */
  login(): void {
    this.loginService.authenticate().subscribe((userResponse: LoginUser) => {
      if (this.loginService.checkIfUSerIsValid(this.user, userResponse)) {
        this.router.navigateByUrl('dashboard');
      }
    });
  }
  /**
   * validation messages are displayed as per input feild
   */
  getErrorMessage() {
    return this.userName.hasError('required') ? "Please enter username: testuser" :
      this.userPassword.hasError('minLength') ? "Please enter password: 1234" :
        '';
  }
}
