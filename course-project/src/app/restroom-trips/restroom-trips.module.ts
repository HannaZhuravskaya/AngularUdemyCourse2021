import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { RestroomTripsRoutingModule } from "./restroom-trips-routing.module";
import { RestroomTripEditComponent } from "./restroom-trip-edit/restroom-trip-edit.component";
import { RestroomTripItemComponent } from "./restroom-trip-list/restroom-trip-item/restroom-trip-item.component";
import { RestroomTripListComponent } from "./restroom-trip-list/restroom-trip-list.component";
import { RestroomTripsComponent } from "./restroom-trips.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RestroomTripsComponent,
        RestroomTripListComponent,
        RestroomTripItemComponent,
        RestroomTripEditComponent
    ],
    imports: [
        RouterModule,
        RestroomTripsRoutingModule,
        SharedModule
    ]
})
export class RestroomTripsModule { }