import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';
import { UserDetails, TransactionList, UserTransactions } from '../model/model';
import { MatTabChangeEvent } from '@angular/material';
import { ViewtransactionsComponent } from './viewtransactions/viewtransactions.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  private userDetailsArray: UserDetails[];
  private transactionList: UserTransactions[];
  private transactionObj;
  private userSelected: UserDetails;
  constructor(private dashboardService: DashboardService, private router: Router) {
    console.log('dashboard call');
  }

  ngOnInit() {
    console.log('dashboard call');
    this.getCustomerList();
  }
  onLinkClick(event: MatTabChangeEvent): void {
    this.getCustomerList();
  }
  getCustomerList(){
    this.dashboardService.getCusomerDetails().subscribe((response: UserDetails[]) => {
      console.log(response);
      this.userDetailsArray = response;
      this.getTransactionList(this.userDetailsArray);
        this.dashboardService.defaultId.subscribe(res => {
            console.log(res);
            if(res=='') {
                if(JSON.parse(localStorage.getItem('custNum')).custNum) {
                  this.userSelected = this.dashboardService.getSelectedUser(this.userDetailsArray,JSON.parse(localStorage.getItem('custNum')).custNum);
                } else {
                    this.router.navigateByUrl('', { replaceUrl: true });
                }
            }  else {
              this.userSelected = this.dashboardService.getSelectedUser(this.userDetailsArray,res);;
            }  
        });
     
    }, (error) => {
      console.log(error);
    });
  }
/**
 * calls dashboard service to retrive the user transaction list.
 */
  getTransactionList(userDetailsArray: UserDetails[]): void {
    // let loggedInUser = userDetailsArray.find(resUser =>resUser.customerName === resUser.username && user.userPassword === resUser.password);
    this.dashboardService.getTransactionList('userDetails.transactionData').subscribe((transactionList: UserTransactions[]) => {
      this.transactionList = transactionList;
      console.log(this.transactionList);
    });
  }
  /**
   * Event Emitter method. 
   * fires when EventEmitter "notifyParent" is emitted from "New Transaction" page.
   */
  updateData(): void {
    this.getTransactionList(this.userDetailsArray);
  }
}
