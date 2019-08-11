import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserDetails, TransactionData, UserTransactions, TransactionList } from 'src/app/model/model';
import { DashboardService } from 'src/app/services/dashboard.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Constants } from 'src/app/constants/constant';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
  value="some Value"
  userDetailsReceived: UserDetails;
  userTransaction: UserTransactions;
  transferCurrency: string;
  userTransactionForm = new FormGroup({
    transferAmount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    beneficiaryBank: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    beneficiaryAccNum: new FormControl('', [Validators.required]),
    paymentDetails: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    beneficiaryName: new FormControl('',[Validators.required])
  });
  constructor(private dashboardService: DashboardService, private snackBar: MatSnackBar, private cdref: ChangeDetectorRef) { }
  ngAfterViewInit() {
    this.userDetailsReceived = new UserDetails()
    this.userDetailsReceived.customerNumber = this.user ? this.user.customerNumber: '';
    this.userTransaction = new UserTransactions();
    this.referenceNum = this.dashboardService.getReferenceNumber();
    this.userTransactionForm.value.phoneNumber = '';
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
        phoneNumber: this.user.phoneNumber,
        transactionData: this.user.transactionData
      }
      // this.userTransactionForm.value.phoneNumber.s = this.user.phoneNumber;
      console.log(this.userTransactionForm.value.phoneNumber);
      this.userTransactionForm.patchValue({phoneNumber:this.user.phoneNumber})
    }
  }
  /**
   * pushes a new transaction object into array.
   * calls the pushNewTransaction service to update the new entry.
   */
  submitTransaction(): void {
    console.log(this.userTransactionForm);
    this.userTransaction = this.mapTransactionForm(this.userTransactionForm.value);
    if(this.userTransactionForm.status === 'VALID'){
      this.dashboardService.getTransactionList(this.userDetailsReceived.transactionData).subscribe((transactionList) => {
        transactionList.push(this.userTransaction)
        this.dashboardService.pushNewTransactions(transactionList, this.userDetailsReceived.transactionData).subscribe((updatedTransactions: TransactionList) => {
          console.log(updatedTransactions);
          this.userTransactionForm.reset();
          this.referenceNum = this.dashboardService.getReferenceNumber();
          this.openSnackBar(Constants.successMessage,'Ok');
          setTimeout(()=>{
            window.location.reload();
          },2000)
        }, (err)=>{
          this.openSnackBar(Constants.failureServiceMessage, 'Ok');
          console.log(err);   
        });
      });
    } else {
      this.openSnackBar(Constants.failureMessage, 'Ok');
    }
  }

  /**
   * returns a form object which is the body of put API call
   * @param transactionForm 
   */
  mapTransactionForm(transactionForm) {
    let formData = new UserTransactions();
    formData.beneficiaryAccNum = transactionForm.beneficiaryAccNum;
    formData.beneficiaryBank = transactionForm.beneficiaryBank;
    formData.paymentDetails = transactionForm.paymentDetails;
    formData.referenceNum = this.referenceNum;
    formData.transferAmount = transactionForm.transferAmount;
    formData.transferCurrency = this.transferCurrency;
    formData.beneficiaryName = transactionForm.beneficiaryName;
    return formData;
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
    if(this.userTransactionForm.status === 'VALID'){
      snackBarRef.afterDismissed().subscribe(()=> {
        this.notifyParent.emit();
        window.location.reload();
      });
    }
  }
}
