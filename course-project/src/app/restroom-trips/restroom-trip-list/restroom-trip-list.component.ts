import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestroomTripType } from '../models/restroom-trip-type.model';
import { RestroomTrip } from '../models/restroom-trip.model';
import { RestroomTripService } from '../services/restroom-trip.service';

@Component({
  selector: 'app-restroom-trip-list',
  templateUrl: './restroom-trip-list.component.html',
  styleUrls: ['./restroom-trip-list.component.css']
})
export class RestroomTripListComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  restroomTrips: RestroomTrip[];
  restroomTripType = RestroomTripType;

  constructor(private restroomTripsService: RestroomTripService) { }

  ngOnInit(): void {
    this.restroomTrips = this.restroomTripsService.getRestroomTrips();

    let sub = this.restroomTripsService.tripsChanged
      .subscribe(
        trips => this.restroomTrips = trips
      );

    this.subscriptions.push(sub);
  }
}