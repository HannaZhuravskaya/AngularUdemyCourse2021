import { Injectable } from "@angular/core";
import { Account } from "../shared/account.model";
import { LoggingService } from "./logging.service";

//Notes: add Injectable if you want to inject smth from constructor
// Since 6+ can add {providedIn: 'root'} and not add to app.module providers
@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    accounts: Account[] = [
        new Account('Master Account', 'active'),
        new Account('Testaccount', 'inactive'),
        new Account('Hidden Account', 'unknown')
    ];

    constructor(private loggingService: LoggingService) { }

    addAccount(name: string, status: string) {
        this.accounts.push(new Account(name, status));
        this.loggingService.logStatusChange(status);
    }

    changeAccountStatus(id: number, newStatus: string) {
        this.accounts[id].status = newStatus;
        this.loggingService.logStatusChange(newStatus);
    }
}