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
  private userDetails: UserDetails;
  private transactionList: UserTransactions[];
  private transactionObj;
  constructor(private dashboardService: DashboardService, private router: Router) {
    console.log('dashboard call');
  }

  ngOnInit() {
    console.log('dashboard call');
    this.dashboardService.getCusomerDetails().subscribe((response: UserDetails) => {
      this.userDetails = response;
      this.getTransactionList(this.userDetails);
    }, (error) => {
      console.log(error);
    });
  }
  onLinkClick(event: MatTabChangeEvent): void {
    this.getTransactionList(this.userDetails);
  }
/**
 * calls dashboard service to retrive the user transaction list.
 */
  getTransactionList(userDetails: UserDetails): void {
    this.dashboardService.getTransactionList(userDetails.transactionData).subscribe((transactionList: TransactionList) => {
      this.transactionList = transactionList.newTransactions;
      console.log(transactionList);
      this.transactionObj = { list: transactionList }
    });
  }
  /**
   * Event Emitter method. 
   * fires when EventEmitter "notifyParent" is emitted from "New Transaction" page.
   */
  updateData(): void {
    this.getTransactionList(this.userDetails);
  }
}
