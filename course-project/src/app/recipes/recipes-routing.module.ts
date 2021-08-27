import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/services/auth.guard";
import { RecipeDetailEmptyComponent } from "./recipe-detail/recipe-detail-empty/recipe-detail-empty.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolverService } from "./services/recipe-resolver.service";


const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeDetailEmptyComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolverService } },
            { path: ':id/edit', component: RecipeEditComponent, resolve: { recipe: RecipeResolverService } }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }