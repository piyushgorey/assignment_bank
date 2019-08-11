import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User, LoginUser } from '../model/model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../constants/constant';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(0)])
  });
  constructor(private loginService: LoginService, private router: Router, private dashboardService: DashboardService,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  /**
   * Authenticates the user and navigates to the dashboard page
   */
  login(): void {
    this.loginService.authenticate().subscribe((userResponse: LoginUser[]) => {
      if (this.loginService.checkIfUSerIsValid(this.userForm.value, userResponse)) {
        this.dashboardService.newId(this.loginService.checkIfUSerIsValid(this.userForm.value, userResponse).custNum);
        let verifyUserSession = {
          isLoggedOut: false,
          custNum: this.loginService.checkIfUSerIsValid(this.userForm.value, userResponse).custNum
        }
        localStorage.setItem('custNum', JSON.stringify(verifyUserSession));
        this.router.navigateByUrl('dashboard');
      } else {
        this.openSnackBar(Constants.loginErrorMsg,'Ok');
      }
    });
  }
  /**
   * Opens material snackBar 
   * @param message 
   * @param action 
   */
  openSnackBar(message:string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}