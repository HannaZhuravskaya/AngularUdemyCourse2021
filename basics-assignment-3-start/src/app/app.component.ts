import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showDetails: boolean = false;
  buttonClicks = [];

  onShowDetails() {
    this.showDetails = !this.showDetails;
    this.buttonClicks.push(Date.now());
  }
}
