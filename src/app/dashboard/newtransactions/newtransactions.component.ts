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
  customerNum: string;
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
    this.customerNum = event.target.value;
    this.userSelected = this.dashboardService.getSelectedUser(this.userArray,this.customerNum)
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
        if(this.userSelected) {
          let transaction = transactionList.find(transaction=> transaction.custNum == this.userSelected.customerNumber);
          transaction.transactionList.push(this.userTransaction.transactionList);
        } else {
          transactionList.push(this.userTransaction);
        }
        this.dashboardService.pushNewTransactions(transactionList).subscribe((updatedTransactions: TransactionList) => {
          console.log(updatedTransactions);
          this.userTransactionForm.reset();
          this.referenceNum = this.dashboardService.getReferenceNumber();
          this.notifyParent.emit();
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
    let transcation = new TransactionFeilds();
    if(this.userSelected) {
      formData.custName = this.userSelected.customerName;
      formData.custNum = this.userSelected.customerName;
    } else {
      formData.custName = this.userDetailsReceived.customerName;
      formData.custNum = this.customerNum
    }
    transcation.beneficiaryAccNum = transactionForm.beneficiaryAccNum;
    transcation.beneficiaryBank = transactionForm.beneficiaryBank;
    transcation.paymentDetails = transactionForm.paymentDetails;
    transcation.referenceNum = this.referenceNum;
    transcation.transferAmount = transactionForm.transferAmount;
    transcation.transferCurrency = this.transferCurrency;
    transcation.beneficiaryName = transactionForm.beneficiaryName;
    formData.transactionList = [];
    // formData.transactionList = new TransactionFeilds()[0];
    formData.transactionList.push(transcation);
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
