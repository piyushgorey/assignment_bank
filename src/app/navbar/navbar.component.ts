import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../model/model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() user: UserDetails;
  constructor(private router: Router) { }

  ngOnInit() {

  }
  /**
   * navigates the user to login page.
   */
  logout(): void {
    localStorage.removeItem('custNum');
    this.router.navigateByUrl('', { replaceUrl: true });
  }
}
