import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./components/alert/alert.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./directives/dropdown/dropdown.directive";
import { PlaceholderDirective } from "./directives/placeholder/placeholder.directive";
import { EnumAsStringPipe } from "./pipes/enum-as-string/enum-as-string.pipe";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        EnumAsStringPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        EnumAsStringPipe
    ]
})
export class SharedModule { }