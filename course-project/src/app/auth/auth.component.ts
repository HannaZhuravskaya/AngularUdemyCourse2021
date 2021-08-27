import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder/placeholder.directive';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  //error: string = null;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm) {
    //this.error = null;

    if (!form.valid)
      return;

    let email = form.value.email;
    let password = form.value.password;

    let authObs = this.isLoginMode
      ? this.authService.signIn(email, password)
      : this.authService.signUp(email, password);

    this.isLoading = true;

    authObs.subscribe(
      _ => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        //this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });

    form.reset();
  }

  // Notes: for dynamic component loading with *ngIf approach
  // onHandleError() {
  //   this.error = null;
  // }

  showErrorAlert(errorMessage: string) {
    // Notes: Simple js object, won't work for Angular
    // const comp = new AlertComponent()

    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const container = this.alertHost.viewContainerRef;

    container.clear();
    const componentRef = container.createComponent(alertComponentFactory);

    componentRef.instance.message = errorMessage;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      container.clear();
    })
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
