import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { RecipeService } from '../recipes/services/recipe.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    collapsed: boolean = true;
    private userSub: Subscription;

    constructor(private recipeService: RecipeService, private authService: AuthService) { }

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onDbSetup() {
        this.recipeService.setupDbInitialState();
    }

    onLogout() {
        this.authService.logOut();
    }
}