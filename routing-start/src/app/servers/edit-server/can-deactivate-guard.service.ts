import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface CanDeactivateComponent {
    canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;
}

export class CanDeactivateGuard implements CanDeactivate<CanDeactivateComponent>{
    canDeactivate(component: CanDeactivateComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return component.canDeactivate();
    }
}