import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuypageComponent } from './components/buypage/buypage.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { ProductsComponent } from './components/products/products.component';
import { SmartphonesComponent } from './components/products/smartphones/smartphones.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

const routes: Routes = [
  {path:'' ,pathMatch:'full', redirectTo:'/user-auth' },
  {path:'login', component:LoginpageComponent},
  {path:"products" , component:ProductsComponent},
  {path:"home" , component:HomepageComponent},
  {path:"404" , component:LoginpageComponent},
  {path:"buy/: id" , component:BuypageComponent},
  {path:"smartphones/: item" , component:SmartphonesComponent},
  {path:"cart", component:CartComponent},
  {path:"user-auth", component:UserAuthComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"my-orders", component:MyOrderComponent},
  {path:"product-Manage", component:ProductsComponent},
  {path:'**', redirectTo:'/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
