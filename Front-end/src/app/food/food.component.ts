import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  providers: [MessageService],
})
export class FoodComponent {
  foodTypes: SelectItem[] = [
    { label: 'Starter', value: 'starter' },
    { label: 'Main Course', value: 'mainCourse' },
    { label: 'Salad', value: 'salad' },
    { label: 'Garnishes', value: 'garnishes' },
    { label: 'Dessert', value: 'dessert' },
  ];
  selectedType;
  editmode = false;
  localId;
  food = {
    name: '',
    price: Number,
    content: '',
    content2: '',
    type: '',
    image: '',
  };
  foods;
  image: File | null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.getFoods();
  }

  getFoods() {
    this.http
      .get('https://termehfood.com/food/food')
      .subscribe((responseData) => {
        this.foods = Object(responseData).foods;
        console.log(this.foods);
      });
  }
  delete(food) {
    this.http
      .delete('https://termehfood.com/food/food/' + food._id)
      .subscribe((responseData) => {
        console.log(responseData);
        this.showSuccessOnDeleteing();
        this.getFoods();
      });
  }
  getFiles(event) {
    this.image = event.target.files[0];
  }

  set(form) {
    this.food.type = Object(this.selectedType).value;
    const formData = new FormData();
    formData.append('name', this.food.name);
    formData.append('price', this.food.price.toString());
    formData.append('content', this.food.content);
    formData.append('content2', this.food.content2);
    formData.append('type', this.food.type);
    formData.append('image', this.image);

    // formData.forEach((value, key) => {
    //   console.log(key + ':' + value);
    // });
    this.http.post('https://termehfood.com/food/food', formData).subscribe(
      (responseData) => {
        if (Object(responseData).status === 201) {
          console.log(201);
          this.showSuccess();
          this.getFoods();
          form.reset();
        }
      },
      (err) => {
        this.showError();
      }
    );
  }
  getEditDetails(id) {
    this.editmode = true;
    this.localId = id;
    let food;
    this.http
      .get('https://termehfood.com/food/food/' + id)
      .subscribe((responseData) => {
        food = Object(responseData).food;
        console.log(food);
        this.food.name = food.name;
        console.log(this.food.name);
        this.food.content = food.content;
        this.food.content2 = food.content2;
        this.food.price = food.price;
        this.food.type = food.type;
        this.food.image = food.image;
      });
  }
  submitEdit() {
    this.food.type = Object(this.selectedType).value;
    const formData = new FormData();
    formData.append('name', this.food.name);
    formData.append('price', this.food.price.toString());
    formData.append('content', this.food.content);
    formData.append('content2', this.food.content2);
    formData.append('type', this.food.type);
    formData.append('image', this.image);
    this.http
      .put('https://termehfood.com/food/food/' + this.localId, formData)
      .subscribe(
        (responseData) => {
          console.log(Object(responseData).food);

          this.showSuccess();
        },
        (err) => {
          this.showError();
        }
      );
    this.getFoods();
  }
  // Pop Up Functions :
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Food Added!',
    });
  }
  showSuccessOnDeleteing() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Food Deleted !',
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error!',
      detail: 'Someting Goes wrong (See console...)!',
    });
  }
  closeFunc(form) {
    this.editmode = false;
    form.reset();
  }
}
