import { browser, by, element } from 'protractor';

export class LoginPage {
    private credentias = {
        username: 'testuser',
        password: 1234
    };

    navigateTo() {
        return browser.get('/'); // we can navigate to '/' for get pblic page since this is the default route
    }

    getPageTitleText() {
        return element(by.css('app-login .login-title')).getText();
    }

    fillCredentials(credentias: any = this.credentias) {
        element(by.css('[formControlName="userName"]')).sendKeys(credentias.username);
        element(by.css('[formControlName="userPassword"]')).sendKeys(credentias.password);
        element(by.css('.mat-raised-button')).click();
    }

    getErrorMessage() {
        return element(by.css('.mat-simple-snackbar')).getText();
    }
}