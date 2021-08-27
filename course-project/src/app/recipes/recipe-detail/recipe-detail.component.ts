import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        this.recipe = data['recipe'];
      }
    );
  }

  addToShoppingList() {
    this.recipeService.addRecipeIngredientsToShoppingList(this.recipe);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.route.snapshot.params['id']);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}