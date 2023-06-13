import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Food from 'src/app/models/food';
import Meal from 'src/app/models/meal';
import User from 'src/app/models/user';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent {
  foods: Food[] = [];
  user: User = this.getUser();
  Meals: Meal[] = [];
  breakfast: Meal | undefined;
  breakfastFoods: Food[] = [];
  lunch: Meal | undefined;
  lunchFoods: Food[] = [];
  dinner: Meal | undefined;
  dinnerFoods: Food[] = [];
  snack: Meal | undefined;
  snackFoods: Food[] = [];

  breakfastForm: FormGroup = this.formBuilder.group({
    search: [''],
    foods: ['', [Validators.required, Validators.minLength(1)]],
  });

  lunchForm: FormGroup = this.formBuilder.group({
    search: [''],
    foods: ['', [Validators.required, Validators.minLength(1)]],
  });

  dinnerForm: FormGroup = this.formBuilder.group({
    search: [''],
    foods: ['', [Validators.required, Validators.minLength(1)]],
  });

  snackForm: FormGroup = this.formBuilder.group({
    search: [''],
    foods: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    const currentDate = new Date().toISOString().slice(0, 10);
    this.http
      .get<Meal[]>(
        `http://localhost:3000/meal/date/${currentDate}/user/${this.user.id}`
      )
      .subscribe({
        next: (res) => {
          this.Meals = res;
        },
        error: (err) => {
          console.log(err);
        },
      })
      .add(() => {
        this.setMeals(this.Meals);
      });
  }

  setMeals(meals: Meal[]) {
    this.breakfast = meals.find((meal) => meal.categoryId === 1);
    this.lunch = meals.find((meal) => meal.categoryId === 2);
    this.dinner = meals.find((meal) => meal.categoryId === 3);
    this.snack = meals.find((meal) => meal.categoryId === 4);

    if (this.breakfast)
      this.breakfast.foods = JSON.parse(this.breakfast.foods as any);
    if (this.lunch) this.lunch.foods = JSON.parse(this.lunch.foods as any);
    if (this.dinner) this.dinner.foods = JSON.parse(this.dinner.foods as any);
    if (this.snack) this.snack.foods = JSON.parse(this.snack.foods as any);

    this.breakfast?.foods.forEach((foodId) => {
      this.http
        .get<Food>(`http://localhost:3000/food/${foodId}`)
        .subscribe((res) => {
          this.breakfastFoods = [...this.breakfastFoods, res];
        });
    });
    this.lunch?.foods.forEach((foodId) => {
      this.http
        .get<Food>(`http://localhost:3000/food/${foodId}`)
        .subscribe((res) => {
          this.lunchFoods = [...this.lunchFoods, res];
        });
    });
    this.dinner?.foods.forEach((foodId) => {
      this.http
        .get<Food>(`http://localhost:3000/food/${foodId}`)
        .subscribe((res) => {
          this.dinnerFoods = [...this.dinnerFoods, res];
        });
    });
    this.snack?.foods.forEach((foodId) => {
      this.http
        .get<Food>(`http://localhost:3000/food/${foodId}`)
        .subscribe((res) => {
          this.snackFoods = [...this.snackFoods, res];
        });
    });
  }

  // Get user from local storage
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Search food
  searchFood(e: Event) {
    const name = (e.target as HTMLInputElement).value;
    if (name.length > 0) {
      this.http
        .get<Food[]>(`http://localhost:3000/food/search/${name}`)
        .subscribe((res) => {
          this.foods = res;
        });
    }
  }

  // Get food by id
  getFood(id: number) {
    this.http.get<Food>(`http://localhost:3000/food/${id}`).subscribe((res) => {
      return res;
    });
  }

  getTotalCalories(foods: Food[]) {
    let totalCalories = 0;
    foods.forEach((food) => {
      totalCalories += food.calorie;
    });
    return totalCalories;
  }

  // Add food to the list
  addElement(form: FormGroup, newFood: Food) {
    let foods: Food[] = form.controls['foods'].value;
    if (!Array.isArray(foods)) {
      foods = [];
    }
    // verify if the food is already in the list
    const foodExist: boolean | undefined =
      foods.find((food) => {
        return food.id === newFood.id;
      }) !== undefined;
    if (foodExist) {
      form.controls['search'].setValue('');
      this.foods = [];
      return;
    }

    foods = [...foods, newFood];
    form.controls['foods'].setValue(foods);
    form.controls['search'].setValue('');
    this.foods = [];
  }

  // Delete food from the list
  deleteElement(form: FormGroup, foodId: number) {
    let foods: Food[] = form.controls['foods'].value;
    foods = foods.filter((food) => food.id !== foodId);
    form.controls['foods'].setValue(foods);
  }

  // Replace foods by id
  replaceFoodsById(foods: Food[]) {
    let newFoods: number[] = [];
    foods.forEach((food) => {
      if (typeof food.id === 'number') newFoods = [...newFoods, food.id];
    });
    return newFoods;
  }

  // Add meal Breakfast
  addBreakfast() {
    const foods: number[] = this.replaceFoodsById(
      this.breakfastForm.controls['foods'].value
    );
    const meal: Meal = {
      userId: this.user.id,
      foods: foods,
      date: new Date().toISOString().slice(0, 10),
      categoryId: 1,
    };
    this.http
      .post<Meal>('http://localhost:3000/meal', meal)
      .subscribe((res) => {
        this.breakfast = res;
        if (this.breakfast)
          this.breakfast.foods = JSON.parse(this.breakfast.foods as any);
        this.breakfastForm.controls['foods'].setValue([]);
      })
      .add(() => {
        this.breakfast?.foods.forEach((foodId) => {
          this.http
            .get<Food>(`http://localhost:3000/food/${foodId}`)
            .subscribe((res) => {
              this.breakfastFoods = [...this.breakfastFoods, res];
            });
        });
      });
  }

  // Add meal Lunch
  addLunch() {
    const foods: number[] = this.replaceFoodsById(
      this.lunchForm.controls['foods'].value
    );
    const meal: Meal = {
      userId: this.user.id,
      foods: foods,
      date: new Date().toISOString().slice(0, 10),
      categoryId: 2,
    };
    this.http
      .post<Meal>('http://localhost:3000/meal', meal)
      .subscribe((res) => {
        this.lunch = res;
        if (this.lunch) this.lunch.foods = JSON.parse(this.lunch.foods as any);
        this.lunchForm.controls['foods'].setValue([]);
      })
      .add(() => {
        this.lunch?.foods.forEach((foodId) => {
          this.http
            .get<Food>(`http://localhost:3000/food/${foodId}`)
            .subscribe((res) => {
              this.lunchFoods = [...this.lunchFoods, res];
            });
        });
      });
  }

  // Add meal Dinner
  addDinner() {
    const foods: number[] = this.replaceFoodsById(
      this.dinnerForm.controls['foods'].value
    );
    const meal: Meal = {
      userId: this.user.id,
      foods: foods,
      date: new Date().toISOString().slice(0, 10),
      categoryId: 3,
    };
    this.http
      .post<Meal>('http://localhost:3000/meal', meal)
      .subscribe((res) => {
        this.dinner = res;
        if (this.dinner)
          this.dinner.foods = JSON.parse(this.dinner.foods as any);
        this.dinnerForm.controls['foods'].setValue([]);
      })
      .add(() => {
        this.dinner?.foods.forEach((foodId) => {
          this.http
            .get<Food>(`http://localhost:3000/food/${foodId}`)
            .subscribe((res) => {
              this.dinnerFoods = [...this.dinnerFoods, res];
            });
        });
      })
  }

  // Add meal Snack
  addSnack() {
    const foods: number[] = this.replaceFoodsById(
      this.snackForm.controls['foods'].value
    );
    const meal: Meal = {
      userId: this.user.id,
      foods: foods,
      date: new Date().toISOString().slice(0, 10),
      categoryId: 4,
    };
    this.http
      .post<Meal>('http://localhost:3000/meal', meal)
      .subscribe((res) => {
        this.snack = res;
        if (this.snack) this.snack.foods = JSON.parse(this.snack.foods as any);
        this.snackForm.controls['foods'].setValue([]);
      })
      .add(() => {
        this.snack?.foods.forEach((foodId) => {
          this.http
            .get<Food>(`http://localhost:3000/food/${foodId}`)
            .subscribe((res) => {
              this.snackFoods = [...this.snackFoods, res];
            });
        });
      })
  }

  // Delete meal
  deleteMeal(mealId: number | undefined) {
    if (!mealId) return;
    this.http.delete<Meal>(`http://localhost:3000/meal/${mealId}`).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
