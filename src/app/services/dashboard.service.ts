import { Injectable } from '@angular/core';
import { UserDetails, ServerResponse, ServerUserInfo, UserTransactions, TransactionList } from '../model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../constants/constant';

@Injectable()
export class DashboardService {
    private _jsonURL = 'asstes/json/customer.json';

    constructor(private http: HttpClient) {
    }

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
    mapUserResponse(userResponse: ServerUserInfo): UserDetails {
        let userDetails = new UserDetails();
        userDetails.customerNumber = userResponse.CUST_NO;
        userDetails.customerAddress = userResponse.STREET_ADDR;
        userDetails.customerName = userResponse.SHORT_NAME;
        userDetails.phonenumber = userResponse.CONTACT_INFO_V7.CONTACT_INFO_V7.PHONE_LIST_V7.PHONE_LIST_ITEM_V7.PHONE;
        return userDetails;
    }
    getReferenceNumber() {
        let referenceNum: string;
        let todayDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        referenceNum = `CUS${todayDate}${Math.floor(Math.random() * 9000) + 1000}`;
        return referenceNum;
    }
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