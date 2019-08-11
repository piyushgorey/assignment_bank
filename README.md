# Taskbank

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

#Description

This project is made using Angular Material library. 
1. Login page allows "testuser" (username) to login using password (1234).
2. After successful login user lands on to dashboard page, where there are two tabs. "New Transaction" and "View Transaction" page.
3. New Transaction page lets the user create a new transaction. 
4. View transaction page lets the user view the past transactions list.

Note:- Login user session time is not implemented in this project neither any encryption or decryption is used to validate the logged in user.


#Rest API calls
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
