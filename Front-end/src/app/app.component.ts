import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Meta } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig,private metaTagService: Meta) {}
  title = 'Rosenfarbe';
  ngOnInit(): void {
    this.metaTagService.addTags([
      { name: 'keywords', content: '' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Rosenfarbe' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2020-12-14', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
    this.primengConfig.ripple = true;
  }
}
