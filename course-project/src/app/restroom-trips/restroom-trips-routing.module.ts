import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RestroomTripEditComponent } from "./restroom-trip-edit/restroom-trip-edit.component";
import { RestroomTripsComponent } from "./restroom-trips.component";

const routes: Routes = [
    {
        path: '', component: RestroomTripsComponent,
        children: [
            { path: 'new', component: RestroomTripEditComponent },
            { path: ':id/edit', component: RestroomTripEditComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RestroomTripsRoutingModule { }