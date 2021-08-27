import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }
  //private route: ActivatedRoute

  ngOnInit() { }

  onLoadServers(id: number) {
    //Notes: 'servers' won't work as relative path without {relativeTo: ...}
    //this.router.navigate(['servers']);
    //this.router.navigate(['servers'], {relativeTo: this.route});

    this.router.navigate(['servers', id, 'edit'], { queryParams: { allowEdit: '1' }, fragment: 'loading' });
  }

  onLogin() {
    this.authService.logIn();
  }

  onLogout() {
    this.authService.logOut();
  }
}