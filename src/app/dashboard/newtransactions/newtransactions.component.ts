import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserDetails, TransactionData, UserTransactions, TransactionList } from 'src/app/model/model';
import { DashboardService } from 'src/app/services/dashboard.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Constants } from 'src/app/constants/constant';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newtransactions',
  templateUrl: './newtransactions.component.html',
  styleUrls: ['./newtransactions.component.scss']
})
export class NewtransactionsComponent implements OnInit {
  @Input() user: UserDetails;
  @Input() transactionObj: any;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  transferCurrencies: string[] = ['AED', 'EUR', 'CHF', 'MUR', 'USD'];
  referenceNum: string;
  userDetailsReceived: UserDetails;
  userTransaction: UserTransactions;
  transferAmount = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);
  beneficiaryBank = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]);
  beneficiaryAcc = new FormControl('', [Validators.required]);
  paymentDetails = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]);
  
  constructor(private dashboardService: DashboardService, private snackBar: MatSnackBar, private cdref: ChangeDetectorRef) { }
  ngAfterViewInit() {
    this.userDetailsReceived = new UserDetails()
    this.userDetailsReceived.customerNumber = this.user ? this.user.customerNumber: '';
    this.userTransaction = new UserTransactions();
    this.referenceNum = this.dashboardService.getReferenceNumber();
    this.cdref.detectChanges();
  }
  ngOnInit() {

  }
  /**
   * gets the customer number and populates the fields remaining with details.
   * @param event 
   */
  getCustomerNumber(event) {
    let customerNum = event.target.value;
    if(customerNum === this.user.customerNumber) {
      this.userDetailsReceived = {
        customerName: this.user.customerName,
        customerAddress: this.user.customerAddress,
        customerNumber: this.user.customerNumber,
        phoneNumber: this.user.phoneNumber
      }
    }
  }
  /**
   * pushes a new transaction object into array.
   * calls the pushNewTransaction service to update the new entry.
   */
  submitTransaction(): void {
    this.userTransaction.referenceNum = this.referenceNum;
    if(this.validateForm()){
      this.dashboardService.getTransactionList().subscribe((transactionList) => {
        transactionList.push(this.userTransaction)
        this.dashboardService.pushNewTransactions(transactionList).subscribe((updatedTransactions: TransactionList) => {
          console.log(updatedTransactions);
          this.openSnackBar(Constants.successMessage,'Ok');
        }, (err)=>{
          console.log(err);   
        });
      });
    } else {
      this.openSnackBar(Constants.failureMessage, 'Ok');
    }
  }

  /**
   * Opens material snackBar 
   * @param message 
   * @param action 
   */
  openSnackBar(message:string, action: string): void {
    let snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });
    if(this.validateForm()){
      snackBarRef.afterDismissed().subscribe(()=> {
        this.notifyParent.emit();
        window.location.reload();
      });
    }
  }
  /**
   * Validations are done for the form fields
   */
  validateForm() {
   if(!this.transferAmount.errors && !this.paymentDetails.errors && !this.phoneNumber.errors &&
    !this.beneficiaryBank.errors) {
      return true
    } else {
      return false;
    }
  }
  
}
