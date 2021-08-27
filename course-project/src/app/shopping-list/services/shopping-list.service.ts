import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../../shared/models/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    ingredientsChanged = new Subject();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredients(...ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next();
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next();
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next();
    }
}