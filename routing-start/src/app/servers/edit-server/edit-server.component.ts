import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanDeactivateComponent } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateComponent {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit)
      return true;

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved)
      return confirm('Do you want to discard the changes?');

    return true;
  }

  ngOnInit() {
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params
      .subscribe(
        params => this.server = this.serversService.getServer(+params['id'])
      );
    this.route.queryParams
      .subscribe(
        params => this.allowEdit = params['allowEdit'] === '1'
      );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
  }
}