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
// @ViewChild('viewTransactionsComp') viewTransactionsComp ;
export class DashboardComponent implements OnInit {
private userDetails: UserDetails;
private transactionList: UserTransactions[];
private transactionObj;
  constructor(private dashboardService: DashboardService, private router: Router) { 
    console.log('dashboard call');
  }
  ngOnInit() {
    console.log('dashboard call');
    this.getTransactionList();
    this.dashboardService.getCusomerDetails().subscribe((response: UserDetails)=> {
      this.userDetails = response;
    },(error)=>{
      console.log(error);
    })
  }
  onLinkClick(event: MatTabChangeEvent) {
    this.getTransactionList();
  }
 getTransactionList() {
  this.dashboardService.getTransactionList().subscribe((transactionList: TransactionList)=> {
    this.transactionList = transactionList.newTransactions;
    console.log(transactionList); 
    this.transactionObj = {list: transactionList}  
  });
 }
 updateData() {
  //  console.log(event);
   this.getTransactionList();
 }
}
