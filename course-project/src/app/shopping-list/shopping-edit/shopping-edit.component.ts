import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') form: NgForm;
  private subscription: Subscription;
  editMode = false;
  private editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        index => {
          let ingredient = this.shoppingListService.getIngredients()[index];
          this.editMode = true;
          this.editedItemIndex = index;
          this.form.setValue({
            'name': ingredient.name,
            'amount': ingredient.amount
          });
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmitIngredient() {
    let ingredient = new Ingredient(this.form.value.name, this.form.value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    }
    else {
      this.shoppingListService.addIngredients(ingredient);
    }

    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.editedItemIndex = null;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}