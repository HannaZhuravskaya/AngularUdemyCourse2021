import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authStatus: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then((authenticated: boolean) => this.authStatus = authenticated);
    this.authService.statusChanged.subscribe(status => this.authStatus = status);
  }
}
