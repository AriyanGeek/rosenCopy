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
import {GalleriaModule} from 'primeng/galleria';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/en/home.component';
import { HomeDeComponent } from './home/de/home-de.component';
import { HomeFrComponent } from './home/fr//home-fr.component';
import { AdminComponent } from './admin/admin.component';
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
import { FooterComponent } from './footer/en/footer.component';
import { FooterDeComponent } from './footer/de/footer-de.component';
import { FooterFrComponent } from './footer/fr/footer-fr.component';
import { SafranComponent } from './b2b/en/safran/safran.component';
import { NusseComponent } from './b2b/en/nusse/nusse.component';
import { SafranDeComponent } from './b2b/de/safran-de/safran-de.component';
import { NusseDeComponent } from './b2b/de/nusse-de/nusse-de.component';
import { SafranFrComponent } from './b2b/fr/safran-fr/safran-fr.component';
import { NusseFrComponent } from './b2b/fr/nusse-fr/nusse-fr.component';
import { GreenDeComponent } from './b2b/de/green-de/green-de.component';
import { GreenComponent } from './b2b/en/green/green.component';
import { GreenFrComponent } from './b2b/fr/green-fr/green-fr.component';

const appRouts: Routes = [
  { path: '', component: HomeDeComponent },
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
  { path: 'en/safran', component: SafranComponent },
  { path: 'de/safran', component: SafranDeComponent },
  { path: 'fr/safran', component: SafranFrComponent },
  { path: 'en/nusse', component: NusseComponent },
  { path: 'de/nusse', component: NusseDeComponent },
  { path: 'fr/nusse', component: NusseFrComponent },
  { path: 'en/green', component: GreenComponent },
  { path: 'de/green', component: GreenDeComponent },
  { path: 'fr/green', component: GreenFrComponent },
  { path: 'en/contact', component: ContactComponent },
  { path: 'de/contact', component: ContactDeComponent },
  { path: 'fr/contact', component: ContactFrComponent },
  { path: 'admin', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeDeComponent,
    HomeFrComponent,
    AdminComponent,
    RosenfarbeComponent,
    RosenfarbeDeComponent,
    RosenfarbeFrComponent,
    ShopComponent,
    ShopDeComponent,
    ShopFrComponent,
    B2bDeComponent,
    B2bComponent,
    B2bFrComponent,
    ContactDeComponent,
    ContactComponent,
    ContactFrComponent,
    LoginComponent,
    FooterComponent,
    FooterDeComponent,
    FooterFrComponent,
    SafranComponent,
    NusseComponent,
    SafranDeComponent,
    NusseDeComponent,
    SafranFrComponent,
    NusseFrComponent,
    GreenDeComponent,
    GreenComponent,
    GreenFrComponent,
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
    RouterModule.forRoot(appRouts , {scrollPositionRestoration: 'enabled'}),
    HttpClientModule,
    NgbModule,
    HammerModule,
    ButtonModule,
    RippleModule,
    SidebarModule,
    GalleriaModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    ],
})
export class AppModule {}
