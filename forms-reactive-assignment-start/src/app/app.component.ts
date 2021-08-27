import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  statuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.form = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenProjectName], this.uniqueProjectName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(this.statuses[0])
    });

    // this.form.valueChanges.subscribe(_ =>
    //   console.log(this.form.get('projectName').status)
    // );
  }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset({ 'status': this.statuses[0] });
  }

  forbiddenProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === "Test")
      return { 'forbiddenName': true };

    return null;
  }

  uniqueProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Proj 1")
          resolve({ 'notUniqueName': true });
        else
          resolve(null);
      }, 1500);
    });

    return promise;
  }
}