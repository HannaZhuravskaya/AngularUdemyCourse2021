import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userActivated: boolean = false;
  subscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.userActivated.subscribe(
      state => this.userActivated = state
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
