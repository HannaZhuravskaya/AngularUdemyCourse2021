import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Ingredient } from "../../shared/models/ingredient.model";
import { ShoppingListService } from "../../shopping-list/services/shopping-list.service";
import { Recipe } from "../models/recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {
    private baseUrl = 'https://ng-course-project-d97bb-default-rtdb.firebaseio.com';
    private recipesEndpoint = '/recipes.json';

    getRecipeEndpoint(id: string) {
        return '/recipes/' + id + '.json';
    }

    constructor(private http: HttpClient, private shoppingListService: ShoppingListService) { }

    recipesChanged = new Subject();

    getRecipesAsync() {
        return this.http.get<{ [key: string]: Recipe }>(this.baseUrl + this.recipesEndpoint)
            .pipe(
                map(response => {
                    let recipes: Recipe[] = [];
                    for (let key in response) {
                        if (response[key]) {
                            recipes.push({ ...response[key], id: key });
                        }
                    }
                    return recipes;
                }));
    }

    getRecipe(id: string) {
        return this.http.get<Recipe>(this.baseUrl + this.getRecipeEndpoint(id));
    }

    addRecipeIngredientsToShoppingList(recipe: Recipe): void {
        this.shoppingListService.addIngredients(...recipe.ingredients);
    }

    addRecipe(recipe: Recipe) {
        return this.http.post(this.baseUrl + this.recipesEndpoint, recipe)
            .pipe(tap(_ => {
                this.recipesChanged.next();
            }));
    }

    updateRecipe(id: string, recipe: Recipe) {
        recipe.id = id;

        return this.http.put(this.baseUrl + this.getRecipeEndpoint(id), recipe)
            .pipe(tap(_ => {
                this.recipesChanged.next();
            }));
    }

    deleteRecipe(id: string) {
        this.http.delete(this.baseUrl + this.getRecipeEndpoint(id))
            .subscribe(_ => {
                this.recipesChanged.next();
            });
    }

    setupDbInitialState() {
        this.http.delete(this.baseUrl + this.recipesEndpoint)
            .subscribe(_ => {
                this.http.put(this.baseUrl + this.recipesEndpoint, this.initialRecipesData)
                    .subscribe(_ => this.recipesChanged.next());
            });
    }

    private initialRecipesData: Recipe[] = [
        new Recipe(
            'Burger',
            'Big cool super burger',
            'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ),
        new Recipe(
            'Lasagna',
            'This is a test recipe',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
            new Ingredient('Thin flat pasta', 12),
            new Ingredient('Ground meats', 1),
            new Ingredient('Tomato sauce', 1)
        )
    ];
}