import { EventEmitter } from "@angular/core";

export class AuthService {
    private loggedIn: boolean = false;
    statusChanged = new EventEmitter<boolean>();

    logIn() {
        this.loggedIn = true;
        this.statusChanged.emit(this.loggedIn);
    }

    logOut() {
        this.loggedIn = false;
        this.statusChanged.emit(this.loggedIn);
    }

    isAuthenticated() {
        return new Promise(
            (resolve, _) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 800);
            }
        )
    }
}