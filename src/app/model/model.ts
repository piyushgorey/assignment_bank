export class User {
    userName: string;
    userPassword: string;

}
export class UserDetails {
    customerNumber: string;
    customerName: string;
    customerAddress: string;
    phoneNumber: string;
    transactionData:string;
}
export class UserTransactions {
    custNum:string;
    custName:string;
    transactionList: TransactionFeilds[];
}
export class TransactionFeilds {
    referenceNum: string;
    transferAmount: string;
    transferCurrency: string;
    beneficiaryBank: string;
    beneficiaryAccNum: string;
    paymentDetails: string;
    beneficiaryName: string;
}
export class TransactionList {
    newTransactions: UserTransactions[];
}
export class ServerResponse {
    responseXML: {
        getCustomerInfoResponse: {
            getCustomerInfoResult: {
                CUST_INFO: ServerUserInfo;
            }
        }
    }
}

export class LoginUser {
    username: string;
    name: string;
    password: string;
    custNum: string
}
export class TransactionData {
    userInfo: UserDetails;
    beneficiaryDetails: {
        beneficiaryBankName: string;
        beneficiaryAccNumber: string;
        paymentDetails: string;
        transferAmt: string;
        transferCurrency: string[]
    }
}

export class ServerUserInfo {
    CUST_NO: string;
    SHORT_NAME: string
    TRANSACTION_DATA: string;
    STREET_ADDR: string
    CONTACT_INFO_V7: {
        CONTACT_INFO_V7: {
            PHONE_LIST_V7: {
                PHONE_LIST_ITEM_V7: {
                    PHONE: string
                }
            }
        }
    }
}
