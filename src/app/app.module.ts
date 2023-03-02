import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http' ;
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './components/products/products.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { BuypageComponent } from './components/buypage/buypage.component';
import { SmartphonesComponent } from './components/products/smartphones/smartphones.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgToastModule } from 'ng-angular-popup';
import { MyOrderComponent } from './components/my-order/my-order.component';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PipePipe } from './service/pipe.pipe';
import { NoSpecialDirective } from './service/no-special.directive';

  
  @NgModule({
    declarations: [
    AppComponent,
    ProductsComponent,
    HomepageComponent,
    LoginpageComponent,
    BuypageComponent,
    SmartphonesComponent,
    HeaderComponent,
    CartComponent,
    UserAuthComponent,
    CheckoutComponent,
    MyOrderComponent,
    PipePipe,
    NoSpecialDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    NgbModule,
    NgToastModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
