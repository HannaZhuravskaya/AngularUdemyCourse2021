import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    //Notes: Use subject for cross components communication instead of EventEmitter. 
    // Use EventEmitter as component @Output  
    userActivated = new Subject<boolean>();
}