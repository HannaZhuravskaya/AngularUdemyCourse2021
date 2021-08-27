import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "../models/user.model";
// Notes: will swap environment and environment.prod automatically
import { environment } from '../../../environments/environment';

export interface AuthResponceData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    displayName?: string,
    registered?: boolean,
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponceData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError),
                tap(data => {
                    this.handleUser(data.email, data.localId, data.idToken, +data.expiresIn)
                }));
    }

    autoSignIn() {
        let userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        let loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            let expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
    }

    signIn(email: string, password: string) {
        return this.http.post<AuthResponceData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError),
                tap(data => {
                    this.handleUser(data.email, data.localId, data.idToken, +data.expiresIn)
                }));
    }

    logOut() {
        localStorage.removeItem('userData');
        this.user.next(null);
        this.router.navigate(['/auth']);

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogOut(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
        }

        return throwError(errorMessage);
    }

    private handleUser(email: string, userId: string, token: string, expiresIn: number) {
        const tokenExpirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, tokenExpirationDate);
        this.user.next(user);
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}