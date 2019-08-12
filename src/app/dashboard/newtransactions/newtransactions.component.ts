import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserDetails, TransactionData, UserTransactions, TransactionList, TransactionFeilds } from 'src/app/model/model';
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
  @Input() userArray: UserDetails[];
  @Input() transactionList: any;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  transferCurrencies: string[] = ['AED', 'EUR', 'CHF', 'MUR', 'USD'];
  referenceNum: string;
  userDetailsReceived: UserDetails;
  userTransaction: UserTransactions;
  transferCurrency: string;
  userSelected:UserDetails
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
    this.userDetailsReceived = new UserDetails();
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
    this.userSelected = this.dashboardService.getSelectedUser(this.userArray,customerNum)
    if(this.userSelected) {
      this.userDetailsReceived = {
        customerName: this.userSelected.customerName,
        customerAddress: this.userSelected.customerAddress,
        customerNumber: this.userSelected.customerNumber,
        phoneNumber: this.userSelected.phoneNumber,
        transactionData:this.userSelected.transactionData
      }
    }
    this.userTransactionForm.patchValue({phoneNumber:this.userDetailsReceived.phoneNumber})
  }
  /**
   * pushes a new transaction object into array.
   * calls the pushNewTransaction service to update the new entry.
   */
  submitTransaction(): void {
    this.userTransaction = this.mapTransactionForm(this.userTransactionForm.value);
    if(this.userTransactionForm.status === 'VALID'){
      this.dashboardService.getTransactionList(this.userDetailsReceived.transactionData).subscribe((transactionList) => {
        let transaction = transactionList.find(transaction=> transaction.custNum == this.userSelected.customerNumber);
        transaction.transactionList.push(this.userTransaction.transactionList);
        this.dashboardService.pushNewTransactions(transactionList).subscribe((updatedTransactions: TransactionList) => {
          console.log(updatedTransactions);
          this.userTransactionForm.reset();
          this.referenceNum = this.dashboardService.getReferenceNumber();
          this.openSnackBar(Constants.successMessage,'Ok');
          setTimeout(()=>{
            window.location.reload();
          },2000)
        }, (err)=>{
          this.openSnackBar(Constants.failureServiceMessage, 'Ok');
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
    let formData: UserTransactions = new UserTransactions();
    formData.custName = this.userSelected.customerName;
    formData.custNum = this.userSelected.customerName;
    formData.transactionList = new TransactionFeilds();
    formData.transactionList.beneficiaryAccNum = transactionForm.beneficiaryAccNum;
    formData.transactionList.beneficiaryBank = transactionForm.beneficiaryBank;
    formData .transactionList.paymentDetails = transactionForm.paymentDetails;
    formData.transactionList.referenceNum = this.referenceNum;
    formData.transactionList.transferAmount = transactionForm.transferAmount;
    formData.transactionList.transferCurrency = this.transferCurrency;
    formData.transactionList.beneficiaryName = transactionForm.beneficiaryName;
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
