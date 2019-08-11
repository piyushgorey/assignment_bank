import { Injectable } from '@angular/core';
import { User, LoginUser } from '../model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Constants } from '../constants/constant';
@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }
    /**
     * calls jsonbin.io user bin and retreives a valid user credentials.
     */
    authenticate(): Observable<any> {
        const options = {
            headers: {
                'secret-key': '$2a$10$paefM8JBnEZqMwOI.O/AzOiFAMyrf8C.CkCVVBtZR9d9qMuO13dly'
            }
        }
        return this.http.get(Constants.loginUserUrl, options);
    }
    /**
     * 
     * @param user Simply validates if the user credentials are matching.
     * @param responseUser 
     */
    checkIfUSerIsValid(user: User, responseUser: LoginUser[]): LoginUser {
        let loggedInUser = responseUser.find(resUser =>user.userName === resUser.username && user.userPassword === resUser.password);
        return loggedInUser;
    }
}