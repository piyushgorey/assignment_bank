import { Injectable } from '@angular/core';
import { UserDetails, ServerResponse, ServerUserInfo, UserTransactions, TransactionList } from '../model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../constants/constant';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient, private router: Router) {
    }
    private noId = new BehaviorSubject<string>('');
    defaultId = this.noId.asObservable();
    /**
     * http call gets the user using https://jsonbin.io/ bin
     * this bin returns an Observable of valid user json which is also present in the asses folder "customer.json"
     */
    getCusomerDetails(): Observable<UserDetails> {
        const options = {
            headers: {
                'secret-key': '$2a$10$paefM8JBnEZqMwOI.O/AzOiFAMyrf8C.CkCVVBtZR9d9qMuO13dly'
            }
        }
        return this.http.get(Constants.getCustDetailsUrl, options).pipe(
            map((res: ServerResponse[]) => this.mapUserResponse(res)
            ))
    }
    /**
     * Updates the user transaction response array with a new entry
     * Returns an Observable of UserTransaction. 
     * @param userTransaction 
     */
    pushNewTransactions(userTransaction: UserTransactions[], url): Observable<any> {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'secret-key': '$2a$10$paefM8JBnEZqMwOI.O/AzOiFAMyrf8C.CkCVVBtZR9d9qMuO13dly',
                'versioning': 'false'
            }
        }
        return this.http.put(url, userTransaction, options);
    }

    /**
     * Responsible for formatting the user details json into much readable format 
     * Filters out redundant feilds and creates a more specific  user details response.
     * @param userResponse 
     */
    mapUserResponse(userResponse: ServerResponse[]): UserDetails {
        let custNum: string;
        this.defaultId.subscribe(res => {
            console.log(res);
            if(res=='') {
                if(JSON.parse(localStorage.getItem('custNum')).custNum) {
                    custNum = JSON.parse(localStorage.getItem('custNum')).custNum;
                } else {
                    this.router.navigateByUrl('', { replaceUrl: true });
                }
            }  else {
                custNum = res;
            }  
        });
        let userInfo: ServerUserInfo;
        let userDetails = new UserDetails();
        for (let userIndex = 0; userIndex < userResponse.length; userIndex++) {
            userInfo = userResponse[userIndex].responseXML.getCustomerInfoResponse.getCustomerInfoResult.CUST_INFO;
            if (userInfo.CUST_NO == custNum) {
                userDetails.customerNumber = userInfo.CUST_NO;
                userDetails.customerAddress = userInfo.STREET_ADDR;
                userDetails.customerName = userInfo.SHORT_NAME;
                userDetails.phoneNumber = userInfo.CONTACT_INFO_V7.CONTACT_INFO_V7.PHONE_LIST_V7.PHONE_LIST_ITEM_V7.PHONE;
                userDetails.transactionData = userInfo.TRANSACTION_DATA;
            }
        }
        return userDetails;
    }
    /**
     * Creates a reference number for a new transaction as per the guidelines
     * The reference must have a prefix “CUS” and followed by an auto-generated number
     * (consisting of YYYYMMDD and a sequence number. Max length of reference should be
        15 characters)
     */
    getReferenceNumber() {
        let referenceNum: string;
        let todayDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        referenceNum = `CUS${todayDate}${Math.floor(Math.random() * 9000) + 1000}`;
        return referenceNum;
    }

    /**
     * Returns an array of past user transaction.
     */
    getTransactionList(url): Observable<any> {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'secret-key': '$2a$10$paefM8JBnEZqMwOI.O/AzOiFAMyrf8C.CkCVVBtZR9d9qMuO13dly',
                'versioning': 'false'
            }
        }
        return this.http.get(url, options);
    }
    newId(urlId) {
        this.noId.next(urlId);
    }
}