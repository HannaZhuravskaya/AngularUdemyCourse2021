import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Notes: default. All styles in this component just for itself
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement') element: { type: string, name: string, content: string };

  constructor() { }

  ngOnInit(): void {
  }
}
