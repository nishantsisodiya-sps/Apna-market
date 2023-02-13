import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/service/product.service';
import { cart, price } from '../products/interface/data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: cart[] | undefined;
  priceSummary: price = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private product: ProductService, private router: Router, private popUp: NgToastService) { }

  ngOnInit(): void {
    this.cartDetails()
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.cartData && this.product.removeCart(cartId)
      .subscribe((result)=>{
        if(result){
          let user = localStorage.getItem('user');
          let userId= user && JSON.parse(user).id;
          this.product.getCartItem(userId)
          this.cartDetails()
        }
      })
  }

  cartDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * 80 * + item.quantity)
        }
        this.priceSummary.price = Math.round(price);
        this.priceSummary.discount = Math.round(price * item.discountPercentage / 100)
        this.priceSummary.delivery = 100;
        this.priceSummary.total = Math.round(price - this.priceSummary.discount + this.priceSummary.delivery)
      })
      if (!this.cartData.length) {
        this.router.navigate(['/home'])
      }
    })
  }

  checkout() {
    this.router.navigate(['/checkout'])    
  }
}
