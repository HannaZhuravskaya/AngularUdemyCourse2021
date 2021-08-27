import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { RestroomTripType } from "../models/restroom-trip-type.model";
import { RestroomTrip } from "../models/restroom-trip.model";

@Injectable({ providedIn: 'root' })
export class RestroomTripService {
    tripsChanged = new Subject<RestroomTrip[]>();

    private trips: RestroomTrip[] = [
        new RestroomTrip(new Date(2000, 1, 12, 12, 44), RestroomTripType.defecation),
        new RestroomTrip(new Date(2002, 1, 12, 13, 44), RestroomTripType.urination)
    ];

    getRestroomTrips() {
        return this.trips.slice();
    }

    addRestroomTrip() {
        throw new Error("Method not implemented.");
        this.tripsChanged.next(this.getRestroomTrips());
    }

    deleteRestroomTrip() {
        throw new Error("Method not implemented.");
        this.tripsChanged.next(this.getRestroomTrips());
    }

    updateRestroomTrip() {
        throw new Error("Method not implemented.");
        this.tripsChanged.next(this.getRestroomTrips());
    }
}