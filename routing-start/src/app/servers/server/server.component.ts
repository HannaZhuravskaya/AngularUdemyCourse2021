import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Server } from 'http';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: Server;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);

    // this.route.params
    //   .subscribe(
    //     params => {
    //       this.server = this.serversService.getServer(+params['id'])
    //     }
    //   );

    //???Notes: We can use resolver for getting async data???
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server']
      }
    );
  }

  onEdit() {
    // Notes: use queryParamsHandling to get params from related route or merge new params with old ones
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}
