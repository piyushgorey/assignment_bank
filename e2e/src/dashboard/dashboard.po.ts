import { browser, by, element } from 'protractor';

export class DashboardPage {
    private formData = {
        customerName: 'testuser',
        customerNumber: '12345678',
        transferCurrency : 'AED',
        customerAddress: 'Pune, India',
        phoneNumber: '098765555',
        transferAmount: '1000',
        beneficiaryBank:'ABC Bank',
        beneficiaryAccNum: '9348599999',
        paymentDetails: 'Test Payment',
        beneficiaryName: 'Jon Dow'

    };
    navigateTo() {
        return browser.get('/dashboard'); // we can navigate to '/' for get pblic page since this is the default route
    }

    getPageTitleText() {
        return element(by.css('app-dashboard .title-page')).getText();
    }

    fillForm(formData: any = this.formData) {
        element(by.css('[name="customerName"]')).sendKeys(formData.customerName);
        element(by.css('[name="customerNumber"]')).sendKeys(formData.customerNumber);
        element(by.css('[name="transferCurrency"]')).sendKeys(formData.transferCurrency);
        element(by.css('[name="customerAddress"]')).sendKeys(formData.customerAddress);
        element(by.css('[name="phoneNumber"]')).sendKeys(formData.phoneNumber);
        element(by.css('[name="transferAmount"]')).sendKeys(formData.transferAmount);
        element(by.css('[name="beneficiaryBank"]')).sendKeys(formData.beneficiaryBank);
        element(by.css('[name="beneficiaryAccNum"]')).sendKeys(formData.beneficiaryAccNum);
        element(by.css('[name="paymentDetails"]')).sendKeys(formData.paymentDetails);
        element(by.css('[name="beneficiaryName"]')).sendKeys(formData.beneficiaryName);
        element(by.css('.mat-raised-button')).click();
    }

    getActionMessage() {
        return element(by.css('.mat-simple-snackbar')).getText();
    }

    viewTransaction(){

    }

    logout(){
        return element(by.css('.logout-btn')).click();
    }
}