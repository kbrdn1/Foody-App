import { Component } from '@angular/core';
import User from 'src/app/models/user';
import Food from 'src/app/models/food';
import Meal from 'src/app/models/meal';
import Chart from 'chart.js/auto';
import { ChartOptions, ChartTypeRegistry, ChartData } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: User = this.getUser();
  foods: Food[] = [];
  Meals: Meal[] = [];
  breakfast: Meal | undefined;
  breakfastFoods: Food[] = [];
  totalBreakfastCalories: number = 0;
  lunch: Meal | undefined;
  lunchFoods: Food[] = [];
  totalLunchCalories: number = 0;
  dinner: Meal | undefined;
  dinnerFoods: Food[] = [];
  totalDinnerCalories: number = 0;
  snack: Meal | undefined;
  snackFoods: Food[] = [];
  totalSnackCalories: number = 0;

  editUserForm: FormGroup = this.formBuilder.group({
    firstname: [this.user.firstname, [Validators.required, Validators.minLength(3)]],
    lastname: [this.user.lastname, [Validators.required, Validators.minLength(3)]],
    email: [this.user.email, [Validators.required, Validators.email]],
    password: [this.user.password, [Validators.required, Validators.minLength(3)]],
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

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  editUser() {
    if (this.editUserForm.valid) {
      this.http
        .put<User>(
          `http://localhost:3000/user/${this.user.id}`,
          this.editUserForm.value
        )
        .subscribe({
          next: (res) => {
            localStorage.setItem('user', JSON.stringify(res));
            this.user = res;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  cancel() {
    this.editUserForm.reset();
  }

  // dd/mm/yyyy
  getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
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
        })
        .add(() => {
          this.getBreakfastChart();
        });
    });
    this.lunch?.foods.forEach((foodId) => {
      this.http
        .get<Food>(`http://localhost:3000/food/${foodId}`)
        .subscribe((res) => {
          this.lunchFoods = [...this.lunchFoods, res];
        })
        .add(() => {
          this.getLunchChart();
        });
    });
    this.dinner?.foods.forEach((foodId) => {
      this.http
        .get<Food>(`http://localhost:3000/food/${foodId}`)
        .subscribe((res) => {
          this.dinnerFoods = [...this.dinnerFoods, res];
        })
        .add(() => {
          this.getDinnerChart();
        });
    });
    this.snack?.foods.forEach((foodId) => {
      this.http
        .get<Food>(`http://localhost:3000/food/${foodId}`)
        .subscribe((res) => {
          this.snackFoods = [...this.snackFoods, res];
        })
        .add(() => {
          this.getSnackChart();
        });
    });
  }

  getTotalCalories(foods: Food[]) {
    let totalCalories = 0;
    foods.forEach((food) => {
      totalCalories += food.calorie;
    });
    return totalCalories;
  }

  getTotalLipids(foods: Food[]) {
    let totalLipids = 0;
    foods.forEach((food) => {
      totalLipids += food.lipid;
    });
    return totalLipids;
  }

  getTotalCarbohydrates(foods: Food[]) {
    let totalCarbohydrates = 0;
    foods.forEach((food) => {
      totalCarbohydrates += food.carbohydrate;
    });
    return totalCarbohydrates;
  }

  getTotalProteins(foods: Food[]) {
    let totalProteins = 0;
    foods.forEach((food) => {
      totalProteins += food.protein;
    });
    return totalProteins;
  }

  getBreakfastChart() {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'doughnut' as keyof ChartTypeRegistry,
      data: {
        labels: ['Lipides', 'Glucides', 'Protéines'],
        datasets: [
          {
            label: 'Petit déjeuner',
            data: [
              this.getTotalLipids(this.breakfastFoods),
              this.getTotalCarbohydrates(this.breakfastFoods),
              this.getTotalProteins(this.breakfastFoods),
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
          },
        ],
      } as ChartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      } as ChartOptions,
    });
    return myChart;
  }

  getLunchChart() {
    const ctx = document.getElementById('doughnutChart2') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'doughnut' as keyof ChartTypeRegistry,
      data: {
        labels: ['Lipides', 'Glucides', 'Protéines'],
        datasets: [
          {
            label: 'Déjeuner',
            data: [
              this.getTotalLipids(this.lunchFoods),
              this.getTotalCarbohydrates(this.lunchFoods),
              this.getTotalProteins(this.lunchFoods),
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
          },
        ],
      } as ChartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      } as ChartOptions,
    });
    return myChart;
  }

  getDinnerChart() {
    const ctx = document.getElementById('doughnutChart3') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'doughnut' as keyof ChartTypeRegistry,
      data: {
        labels: ['Lipides', 'Glucides', 'Protéines'],
        datasets: [
          {
            label: 'Diner',
            data: [
              this.getTotalLipids(this.dinnerFoods),
              this.getTotalCarbohydrates(this.dinnerFoods),
              this.getTotalProteins(this.dinnerFoods),
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
          },
        ],
      } as ChartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      } as ChartOptions,
    });
    return myChart;
  }

  getSnackChart() {
    const ctx = document.getElementById('doughnutChart4') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'doughnut' as keyof ChartTypeRegistry,
      data: {
        labels: ['Lipides', 'Glucides', 'Protéines'],
        datasets: [
          {
            label: 'Encas',
            data: [
              this.getTotalLipids(this.snackFoods),
              this.getTotalCarbohydrates(this.snackFoods),
              this.getTotalProteins(this.snackFoods),
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
          },
        ],
      } as ChartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      } as ChartOptions,
    });
    return myChart;
  }
}
