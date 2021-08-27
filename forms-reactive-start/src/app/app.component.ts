import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUsernames = ['test', 'admin'];

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail)
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  onAddHobby() {
    (<FormArray>this.form.get('hobbies')).push(new FormControl(null, Validators.required));
  }

  get hobbyControls() {
    return (this.form.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1)
      return { 'nameIsForbidden': true };

    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        }
        else { resolve(null); }
      }, 1500);
    });

    return promise;
  }
}