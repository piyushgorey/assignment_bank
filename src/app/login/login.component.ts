import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User, LoginUser } from '../model/model';
import { Router } from '@angular/router';

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
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Authenticates the user and navigates to the dashboard page
   */
  login(): void {
    this.loginService.authenticate().subscribe((userResponse: LoginUser) => {
      if (this.loginService.checkIfUSerIsValid(this.userForm.value, userResponse)) {
        this.router.navigateByUrl('dashboard');
      }
    });
  }
}
