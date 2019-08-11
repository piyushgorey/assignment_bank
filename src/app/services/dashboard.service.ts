import { Injectable } from '@angular/core';
import { UserDetails, ServerResponse, ServerUserInfo, UserTransactions, TransactionList } from '../model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../constants/constant';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient) {
    }

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
            map((res: ServerResponse) => this.mapUserResponse(res.responseXML.getCustomerInfoResponse.getCustomerInfoResult.CUST_INFO)
            ))
    }
    /**
     * Updates the user transaction response array with a new entry
     * Returns an Observable of UserTransaction. 
     * @param userTransaction 
     */
    pushNewTransactions(userTransaction:UserTransactions[]): Observable<any> {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'secret-key': '$2a$10$paefM8JBnEZqMwOI.O/AzOiFAMyrf8C.CkCVVBtZR9d9qMuO13dly',
                'versioning': 'false'
            }
        }
        return this.http.put(Constants.newTransactionUrl, userTransaction, options);
    }

    /**
     * Responsible for formatting the user details json into much readable format 
     * Filters out redundant feilds and creates a more specific  user details response.
     * @param userResponse 
     */
    mapUserResponse(userResponse: ServerUserInfo): UserDetails {
        let userDetails = new UserDetails();
        userDetails.customerNumber = userResponse.CUST_NO;
        userDetails.customerAddress = userResponse.STREET_ADDR;
        userDetails.customerName = userResponse.SHORT_NAME;
        userDetails.phoneNumber = userResponse.CONTACT_INFO_V7.CONTACT_INFO_V7.PHONE_LIST_V7.PHONE_LIST_ITEM_V7.PHONE;
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
    getTransactionList(): Observable<any> {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'secret-key': '$2a$10$paefM8JBnEZqMwOI.O/AzOiFAMyrf8C.CkCVVBtZR9d9qMuO13dly',
                'versioning': 'false'
            }
        }
        return this.http.get(Constants.newTransactionUrl, options);
    }
}