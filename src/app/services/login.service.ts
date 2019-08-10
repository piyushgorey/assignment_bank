import { Injectable } from '@angular/core';
import { User, LoginUser } from '../model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        return this.http.get('https://api.jsonbin.io/b/5d49797c89ed890b24ccb718/1', options);
    }
    /**
     * 
     * @param user Simply validates if the user credentials are matching.
     * @param responseUser 
     */
    checkIfUSerIsValid(user: User, responseUser: LoginUser): boolean {
        if (user.username === responseUser.username && user.password === responseUser.password) {
            return true;
        } else {
            return false;
        }
    }
}