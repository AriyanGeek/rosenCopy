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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { FoodComponent } from './food/food.component';
import { HomeDeComponent } from './home-de/home-de.component';

const appRouts: Routes = [
  { path: '', component: HomeComponent },
  { path: 'de', component: HomeDeComponent },
  { path: 'admin/events', component: AdminComponent },
  { path: 'admin/foods', component: FoodComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    FoodComponent,
    HomeDeComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
