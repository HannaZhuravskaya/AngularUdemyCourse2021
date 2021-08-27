import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form: NgForm;
  defaultQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['male', 'female'];
  formSubmitted = false;

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };

  suggestUserName() {
    const suggestedName = 'Superuser';

    // Notes: Set all the form
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: '',
    //   questionAnswer: '',
    //   gender: ''
    // });

    // Notes: Ovverides parts of the form
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.formSubmitted = true;
    this.user.username = this.form.value.userData.username;
    this.user.email = this.form.value.userData.email;
    this.user.gender = this.form.value.gender;
    this.user.secretQuestion = this.form.value.secret;
    this.user.answer = this.form.value.questionAnswer;

    // Notes: can reset to default values. Again ng-untouched and etc. as we reload the page
    this.form.reset()
  }
}