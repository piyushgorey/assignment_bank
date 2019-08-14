import { LoginPage } from './login.po';
import { DashboardPage } from '../dashboard/dashboard.po';

describe('assignment_bank - Login', () => {
    let page: LoginPage;
    let dashboardPage: DashboardPage;
    const wrongCredentias = {
        username: 'wrongname',
        password: 'wrongpasswd'
    };

    beforeEach(() => {
        page = new LoginPage();
        dashboardPage = new DashboardPage();
    });

    it('when user browses to our app he should see the default “login” screen', () => {
        page.navigateTo();
        expect(page.getPageTitleText()).toEqual('Sign-In');
    });

    it('when user trying to login with wrong credentials he should stay on “login” page and see error notification', () => {
        page.navigateTo();
        page.fillCredentials(wrongCredentias);
        expect(page.getPageTitleText()).toEqual('Sign-In');
        expect(page.getErrorMessage()).toEqual(`Login details you entered are incorrect. Please try again later !`);
    });

    it('when login is successful — he should redirect to “dashboard” page', () => {
        page.navigateTo();
        page.fillCredentials();
        expect(dashboardPage.getPageTitleText()).toEqual('Welcome Test user');
    });

    it('when user trying to new transaction — he should fills all required fields', () => {
        dashboardPage.navigateTo();
        dashboardPage.fillForm();
       // expect(dashboardPage.getActionMessage()).toEqual('Transaction details are submitted successfully.');
    });

    it('when user trying logout— he should redirect login', () => {
        dashboardPage.navigateTo();
        dashboardPage.logout();
    });

    

});
