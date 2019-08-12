import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { UserDetails, UserTransactions, TransactionList } from 'src/app/model/model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-viewtransactions',
  templateUrl: './viewtransactions.component.html',
  styleUrls: ['./viewtransactions.component.scss']
})
export class ViewtransactionsComponent implements OnInit {
  @Input() user: UserDetails;
  @Input() transactionList;
  constructor(private dashboardService: DashboardService, private cdref: ChangeDetectorRef) {

   }
   ngAfterViewInit() {
    // if(this.transactionObj) {
    //   this.transactionList = this.transactionObj.list
    // }
    this.cdref.detectChanges();
  }
  ngOnInit() {

  }
}
