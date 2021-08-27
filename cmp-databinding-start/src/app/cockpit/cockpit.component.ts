import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ blueprintName: string, blueprintContent: string }>();
  // newServerName = 'New server name';
  newServerContent = 'New server content';
  @ViewChild('serverNameInput', { static: true }) serverNameInput: ElementRef<HTMLInputElement>;

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      blueprintName: this.serverNameInput.nativeElement.value,
      blueprintContent: this.newServerContent
    });
  }
}