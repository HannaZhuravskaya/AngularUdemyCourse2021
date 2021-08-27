import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountsService } from './services/accounts.service';
import { LoggingService } from './services/logging.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  //Notes: if I want to have an ability to use services in app component and all child components or inject into other services
  //providers: [AccountsService, LoggingService],
  // since 
  providers: [LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
