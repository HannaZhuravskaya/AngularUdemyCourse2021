import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  form: FormGroup;
  private editMode = false;
  private id: string;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  //TODO: remove subscription on service from detail component, add tap to emit event in service, subscribe here before change the route.
  // onSubmit() {
  //   if (this.editMode) {
  //     this.recipeService.updateRecipe(this.route.snapshot.params['id'], this.form.value);
  //   }
  //   else {
  //     this.recipeService.addRecipe(this.form.value);
  //   }

  //   this.editMode = false;
  //   this.form.reset();
  //   this.router.navigate(['../'], { relativeTo: this.route })
  // }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.route.snapshot.params['id'], this.form.value)
        .subscribe(_ => {
          this.editMode = false;
          this.form.reset();
          this.router.navigate(['../'], { relativeTo: this.route })
        });
    }
    else {
      this.recipeService.addRecipe(this.form.value)
        .subscribe(response => {
          this.editMode = false;
          this.form.reset();
          this.router.navigate(['../', response['name']], { relativeTo: this.route })
        });
    }

    // this.editMode = false;
    // this.form.reset();
    // this.router.navigate(['../'], { relativeTo: this.route })
  }

  addIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]*$/)])
      }))
  }

  deleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  get ingredients() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.recipeService.getRecipe(this.id)
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeDescription = recipe.description;
          recipeImagePath = recipe.imagePath;

          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]*$/)])
              }));
          }

          this.form = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'ingredients': recipeIngredients
          });
        });
    }
    else {
      this.form = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'ingredients': recipeIngredients
      });
    }
  }
}