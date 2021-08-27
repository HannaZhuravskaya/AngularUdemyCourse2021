import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { AppRoutingModule } from "./app-routing.module";

// Notes: feature modules. If you want to use lazy load approach -> do not include to imports! Config in routing module.
// Notes: shared module. Use for components that should be shared between modules.
import { SharedModule } from "./shared/shared.module";

// Notes: core module. Use to provide all things you need
import { CoreModule } from "./core.module"
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }