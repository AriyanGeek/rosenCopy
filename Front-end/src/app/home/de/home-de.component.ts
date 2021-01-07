import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-de',
  templateUrl: './home-de.component.html',
  styleUrls: ['./home-de.component.css'],
})
export class HomeDeComponent implements OnInit {
  visibleSidebar;
  langs = ['EN','DE','FR'];
  selectedLang: string;
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
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.updateTag(
      {
        name: 'description',
        content: '',
      }
    );
    this.setTitle('Home');
    this.selectedLang = 'DE';

  }

  ngOnInit(): void {}
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  onIndexChange(event) {
    console.log(event);
  }
  changeLang(){
    this.router.navigate(['/' + (this.selectedLang.toLowerCase())]);
  }
}
