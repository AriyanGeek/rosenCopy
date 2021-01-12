import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  visibleSidebar;
  langs = ['EN','DE','FR'];
  selectedLang: string;
  images: any[];

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
    this.selectedLang = 'EU';
    this.images = [['../../../assets/img/c1.jpg','../../../assets/img/cb1.jpg'],
    ['../../../assets/img/c3.jpg','../../../assets/img/cb3.jpg'],
    ['../../../assets/img/c2.jpg','../../../assets/img/cb2.jpg'],
    ['../../../assets/img/c4.jpg','../../../assets/img/cb4.jpg']
  ]

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

