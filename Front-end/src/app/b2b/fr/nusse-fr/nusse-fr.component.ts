import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nusse-fr',
  templateUrl: './nusse-fr.component.html',
  styleUrls: ['./nusse-fr.component.css']
})
export class NusseFrComponent implements OnInit {
  visibleSidebar;
  langs = ['EN','DE','FR'];
  selectedLang: string;

  constructor(
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
    this.selectedLang = 'FR';

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
