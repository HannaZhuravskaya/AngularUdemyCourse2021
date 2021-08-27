import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  odds: number[] = [];
  evens: number[] = [];

  onNumberReceived(number: number) {
    if (number % 2 == 1)
      this.odds.push(number);
    else
      this.evens.push(number);
  }

  clearNumbers() {
    this.odds = [];
    this.evens = [];
  }
}
