import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  intervalId: any;
  timer: number;
  @Output('gameTimeChanged') timeChanged = new EventEmitter<number>();
  @Output('gameStarted') gameStarted = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onStartGame() {
    this.gameStarted.emit();
    this.timer = 0;
    this.intervalId = setInterval(_ => { this.timer++; this.timeChanged.emit(this.timer) }, 1000);
  }

  onStopGame() {
    clearInterval(this.intervalId);
  }
}
