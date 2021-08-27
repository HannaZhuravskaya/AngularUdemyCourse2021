import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent },
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    {
        path: 'users', component: UsersComponent, children: [
            { path: ':id/:name', component: UserComponent },
        ]
    },
    {
        path: 'servers',
        /* 
        Notes: canActivate uses CanActivate interface and relates to route, 
        when canActivateChild uses CanActivateChild and relates to route children
        */
        // canActivate: [AuthGuard], 
        canActivateChild: [AuthGuard],
        component: ServersComponent,
        children: [
            { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorComponent, data: { message: 'Page not found!' } },
    //Notes: ** catch all paths that you don't know. It should be THE LAST ROUTE!!!
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }