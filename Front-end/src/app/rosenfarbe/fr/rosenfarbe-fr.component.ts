import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-rosenfarbe-fr',
  templateUrl: './rosenfarbe-fr.component.html',
  styleUrls: ['./rosenfarbe-fr.component.css']
})
export class RosenfarbeFrComponent implements OnInit {
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

