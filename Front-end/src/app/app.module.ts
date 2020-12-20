import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {SidebarModule} from 'primeng/sidebar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/en/home.component';
import { HomeDeComponent } from './home/de/home-de.component';
import { HomeFrComponent } from './home/fr//home-fr.component';
import { AdminComponent } from './admin/admin.component';
import { FoodComponent } from './food/food.component';
import { RosenfarbeComponent } from './rosenfarbe/en/rosenfarbe.component';
import { RosenfarbeDeComponent } from './rosenfarbe/de/rosenfarbe-de.component';
import { RosenfarbeFrComponent } from './rosenfarbe/fr/rosenfarbe-fr.component';
import { ShopDeComponent } from './shop/de/shop-de.component';
import { ShopComponent } from './shop/en/shop.component';
import { ShopFrComponent } from './shop/fr/shop-fr.component';
import { B2bDeComponent } from './b2b/de/b2b-de.component';
import { B2bComponent } from './b2b/en/b2b.component';
import { B2bFrComponent } from './b2b/fr/b2b-fr.component';
import { ContactDeComponent } from './contact/de/contact-de.component';
import { ContactComponent } from './contact/en/contact.component';
import { ContactFrComponent } from './contact/fr/contact-fr.component';
import { LoginComponent } from './login/login.component';

const appRouts: Routes = [
  { path: '', component: HomeComponent },
  { path: 'en', component: HomeComponent },
  { path: 'de', component: HomeDeComponent },
  { path: 'fr', component: HomeFrComponent },
  { path: 'en/rosenfarbe', component: RosenfarbeComponent },
  { path: 'de/rosenfarbe', component: RosenfarbeDeComponent },
  { path: 'fr/rosenfarbe', component: RosenfarbeFrComponent },
  { path: 'en/shop', component: ShopComponent },
  { path: 'de/shop', component: ShopDeComponent },
  { path: 'fr/shop', component: ShopFrComponent },
  { path: 'en/b2b', component: B2bComponent },
  { path: 'de/b2b', component: B2bDeComponent },
  { path: 'fr/b2b', component: B2bFrComponent },
  { path: 'en/contact', component: ContactComponent },
  { path: 'de/contact', component: ContactDeComponent },
  { path: 'fr/contact', component: ContactFrComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'admin/foods', component: FoodComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    FoodComponent,
    HomeDeComponent,
    RosenfarbeComponent,
    RosenfarbeDeComponent,
    RosenfarbeFrComponent,
    ShopDeComponent,
    ShopComponent,
    ShopFrComponent,
    B2bDeComponent,
    B2bComponent,
    B2bFrComponent,
    ContactDeComponent,
    ContactComponent,
    ContactFrComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule,
    ToastModule,
    DropdownModule,
    TabViewModule,
    // MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRouts),
    HttpClientModule,
    NgbModule,
    HammerModule,
    ButtonModule,
    RippleModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
