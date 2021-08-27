import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedSubscription: string = 'Advanced';
  subscriptions = ['Basic', 'Advanced', 'Pro'];

  @ViewChild('form') form: NgForm;

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }
}