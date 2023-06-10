import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Food from 'src/app/models/food';
import Jwt from 'src/app/models/jwt';
import User from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  jwt: Jwt | null = null;
  user: User | null = this.getUser();
  Foods: Food[] | null = null;
  selectedFood: Food | null = null;
  selectedFile: File | null = null;
  addForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    img: ['', [Validators.required, Validators.pattern(/\.(png|jpe?g)$/i)]],
    calorie: ['', [Validators.required, Validators.min(0)]],
    lipid: ['', [Validators.required, Validators.min(0)]],
    carbohydrate: ['', [Validators.required, Validators.min(0)]],
    protein: ['', [Validators.required, Validators.min(0)]],
  });
  updateForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    img: ['', [Validators.pattern(/\.(png|jpe?g)$/i)]],
    calorie: ['', [Validators.required, Validators.min(0)]],
    lipid: ['', [Validators.required, Validators.min(0)]],
    carbohydrate: ['', [Validators.required, Validators.min(0)]],
    protein: ['', [Validators.required, Validators.min(0)]],
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private auth: AuthentificationService
  ) {
    this.http.get<Food[]>('http://localhost:3000/food').subscribe((foods) => {
      this.Foods = foods;
    });

    this.auth.$jwt.subscribe({
      next: (jwt) => {
        this.jwt = jwt;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  selectFood(food: Food) {
    this.selectedFood = food;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  addFood() {
    if (this.addForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('food', JSON.stringify(this.addForm.value));
      formData.append('file', this.selectedFile);

      this.http
        .post<Food>('http://localhost:3000/food', formData)
        .subscribe((food) => {
          const newFood: Food = {
            id: food.id,
            name: food.name,
            img: food.img,
            calorie: food.calorie,
            lipid: food.lipid,
            carbohydrate: food.carbohydrate,
            protein: food.protein,
          };
          this.Foods?.push(newFood);
          this.addForm.reset();
        });
    }
  }

  openEditModal() {
    this.updateForm.patchValue({
      name: this.selectedFood?.name,
      calorie: this.selectedFood?.calorie,
      lipid: this.selectedFood?.lipid,
      carbohydrate: this.selectedFood?.carbohydrate,
      protein: this.selectedFood?.protein,
    });
  }

  editFood() {
    if (this.updateForm.valid && this.selectedFood) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('food', JSON.stringify(this.updateForm.value));
        formData.append('file', this.selectedFile);

        this.http
          .put<Food>(
            `http://localhost:3000/food/${this.selectedFood.id}`,
            formData
          )
          .subscribe((food) => {
            const index = this.Foods?.findIndex(
              (food) => food.id === this.selectedFood?.id
            );
            if (index !== undefined && index !== -1) {
              this.Foods?.splice(index, 1, food);
            }
            this.updateForm.reset();
            this.selectedFood = null;
          });
      } else {
        let form = this.updateForm.value;
        delete form.img;
        this.http
          .patch<Food>(
            `http://localhost:3000/food/${this.selectedFood.id}`,
            this.updateForm.value
          )
          .subscribe((food) => {
            const index = this.Foods?.findIndex(
              (food) => food.id === this.selectedFood?.id
            );
            if (index !== undefined && index !== -1) {
              this.Foods?.splice(index, 1, food);
            }
            this.updateForm.reset();
            this.selectedFood = null;
          });
      }
    }
  }

  deleteFood() {
    if (this.selectedFood) {
      this.http
        .delete<Food>(`http://localhost:3000/food/${this.selectedFood.id}`)
        .subscribe((food) => {
          const index = this.Foods?.findIndex(
            (food) => food.id === this.selectedFood?.id
          );
          if (index !== undefined && index !== -1) {
            this.Foods?.splice(index, 1);
          }
          this.updateForm.reset();
          this.selectedFood = null;
        });
    }
  }

  cancel() {
    this.addForm.reset();
    this.updateForm.reset();
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
}
