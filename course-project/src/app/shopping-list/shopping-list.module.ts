import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        FormsModule,
        // Notes: for really small modules
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent }
        ]),
        SharedModule
    ]
})
export class ShoppingListModule { }