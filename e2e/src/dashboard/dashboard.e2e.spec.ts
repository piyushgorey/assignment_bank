import { DashboardPage } from '../dashboard/dashboard.po';

describe('assignment_bank - Dashboard', () => {
    let dashboardPage: DashboardPage;
    
    beforeEach(() => {
        dashboardPage = new DashboardPage();
    });
   
   /*  it('when user browses to our app he should see the “dashboard” screen', () => {
        dashboardPage.navigateTo();
        expect(dashboardPage.getPageTitleText()).toEqual('Welcome Test user');
    });
 */
    it('when user trying to new transaction — he should fills all required fields', () => {
        dashboardPage.navigateTo();
        dashboardPage.fillForm();
      //  expect(dashboardPage.getPageTitleText()).toEqual('Welcome Test user');
    });

});
