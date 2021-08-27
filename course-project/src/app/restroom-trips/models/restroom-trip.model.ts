import { RestroomTripType } from "./restroom-trip-type.model";

export class RestroomTrip {
    dateTime: Date;
    type: RestroomTripType;

    constructor(dateTime: Date, type: RestroomTripType) {
        this.dateTime = dateTime;
        this.type = type;
    }
}