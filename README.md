# Taskbank

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

#Description

This project is made using Angular Material library. 
1. Login page allows "testuser" (username) to login using password (1234).
2. There are three Valid user with these credential : 
    a. (username: testuser, password: 1234)
    b. (username: testusertwo, password: 1234)
    c. (username: testuserthree, password: 1234)
3. After successful login user lands on to dashboard page, where there are two tabs. "New Transaction" and "View Transaction" page.
4. New Transaction page lets user to create a new transaction that reflects in the user's view transaction page once the transaction is successfully made.
5. View transaction page shows the history of all the transaction made. This page shows the all the transactions of the logged In customer.
6. A tooltip suggests to use the customer number of logged in user to automatically populate some of the form fields.
7. Please use following customer number to auto populate the data

    for, testuser customer number = 23423,
    for, testusertwo customer number = 23424,
    for, testuserthree customer number = 23425
    
Note:- Login user session time is not implemented in this project neither any encryption or decryption is used to validate the logged in user.


#Rest API calls
1. Once the user inputs a valid credentials , it is validated with the service response array and the user object is passed on to dashboard using behavior subject observable.
2. This validation is done on the basis of unique customer ID of each user. Once a valid user is logged in. the respective transaction data is fetched. the Transaction url present in the response of the valid user and the url is passed to get the transaction details of specific user.


For all the REST APIs methods , this project uses jsonbin.io. JSONbin.io is a free JSON storage and JSON hosting service. The customer.json file is retrieved using a secret key and three other bins are created and consumed using get and put calls.


## Installation and Development

1. Run "git clone https://github.com/piyushgorey/assignment_bank.git" command to clone the project.
2. ```cd assignment_bank```
3. Run "npm install" to install all the node libraries (node_modules)
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
