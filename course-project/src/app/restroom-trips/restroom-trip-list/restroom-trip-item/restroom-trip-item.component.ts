import { Component, Input, OnInit } from '@angular/core';
import { RestroomTrip } from '../../models/restroom-trip.model';

@Component({
  selector: 'app-restroom-trip-item',
  templateUrl: './restroom-trip-item.component.html',
  styleUrls: ['./restroom-trip-item.component.css']
})
export class RestroomTripItemComponent implements OnInit {
  @Input() restroomTrip: RestroomTrip;
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }
}