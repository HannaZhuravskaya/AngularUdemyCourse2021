import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: { id: number, name: string };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    /*
    Notes: if component can be reloaded from itself - it's nessesary to subscribe on changes.
    For example: from 'users/user/1' directly navigate to 'users/user/2'. 
    Component 'user' won't be recreated, so ngOnInit won't be called and data won't changed.
    in other cases it's OK to use just snapshot on init.
     */
    this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = this.route.snapshot.params['id'];
          this.user.name = this.route.snapshot.params['name'];
        }
      );
  }
}