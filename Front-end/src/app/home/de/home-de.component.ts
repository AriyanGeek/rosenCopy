import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-de',
  templateUrl: './home-de.component.html',
  styleUrls: ['./home-de.component.css'],
})
export class HomeDeComponent implements OnInit {
  all = true;
  starter = true;
  mainCourse = true;
  salad = true;
  garnishes = true;
  dessert = true;
  foods;
  events;

  constructor(
    private http: HttpClient,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Termeh Persian Grill is a unique dining experience, combining authentic Persian and Middle Eastern cuisine.Our guests come to Termeh expecting the best kabob and Middle Eastern food in Kaiserslautern.',
      },
      { name: 'author', content: 'Termeh' },
      {
        name: 'keywords',
        content: 'Termeh, Persian , Restaurant , food , kebab',
      },
    ]);
    this.setTitle('Termeh Persian Restaurant');
    this.getFoods();
    this.getEvents();
  }

  ngOnInit(): void {}
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  getFoods() {
    this.http
      .get('https://termehfood.com/food/food')
      .subscribe((responseData) => {
        this.foods = Object(responseData).foods;
        console.log(this.foods);
      });
  }
  getEvents() {
    this.http
      .get('https://termehfood.com/event/event')
      .subscribe((responseData) => {
        this.events = Object(responseData).events;
        console.log(this.events);
      });
  }

  // filtering menu
  show(type) {
    if (this.all === true) {
      return true;
    } else if (type === 'starter' && this.starter === true) {
      return true;
    } else if (type === 'mainCourse' && this.mainCourse === true) {
      return true;
    } else if (type === 'salad' && this.salad === true) {
      return true;
    } else if (type === 'garnishes' && this.garnishes === true) {
      return true;
    } else if (type === 'dessert' && this.dessert === true) {
      return true;
    } else {
      return false;
    }
  }

  showAll() {
    this.all = true;
  }
  showStarter() {
    this.all = false;
    this.starter = true;
    this.mainCourse = false;
    this.salad = false;
    this.garnishes = false;
    this.dessert = false;
  }
  showMain() {
    this.all = false;
    this.starter = false;
    this.mainCourse = true;
    this.salad = false;
    this.garnishes = false;
    this.dessert = false;
    console.log(this.all, this.starter, this.mainCourse, this.salad);
  }
  showSalad() {
    this.all = false;
    this.starter = false;
    this.mainCourse = false;
    this.salad = true;
    this.garnishes = false;
    this.dessert = false;
  }
  showGarni() {
    this.all = false;
    this.starter = false;
    this.mainCourse = false;
    this.salad = false;
    this.garnishes = true;
    this.dessert = false;
  }
  showDess() {
    this.all = false;
    this.starter = false;
    this.mainCourse = false;
    this.salad = false;
    this.garnishes = false;
    this.dessert = true;
  }
  onIndexChange(event) {
    console.log(event);
  }
}
