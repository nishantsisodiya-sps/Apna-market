import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/service/product.service';
import { cart, order, price, typeDeliver } from '../products/interface/data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  typeDeliver : typeDeliver[] = []
  paymentType: typeDeliver[] = [
    {value: 'Pay on delivery', viewValue: 'Pay on delivery'},
    {value: 'UPI', viewValue: 'UPI'},
    {value: 'Credit card', viewValue: 'Credit card'},
    {value: 'Debit Card', viewValue: 'Debit Card'},
  ];
  priceSummary: price = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  showSpinner : boolean = false
  constructor(private product : ProductService , private router : Router , private popUp: NgToastService) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{

      let price = 0;
      this.cartData = result;
      result.forEach((item)=>{
        if(item.quantity){
          price = price + (+item.price * 80 * + item.quantity)
        }
        let discount = Math.round(price * item.discountPercentage / 100)
        let delivery = 100;
        let totalPrice = Math.round(price - discount + delivery)

        this.totalPrice = totalPrice
      })
    })
  }

  orderNow(data : {email : string , address:string , contact : string}){
    let popup = new Promise((resolve , reject)=>{
        resolve(this.popUp.info({detail:"Order is being placed" , summary: "Order is being placed", duration:2000}))
    })
    this.showSpinner = true
    setTimeout( () => this.showSpinner = false, 5000 );
    console.warn(data);
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderData : order = {
        ...data,
        totalPrice: Math.round(this.totalPrice),
        userId,
        id: undefined,
        thumbnail: "",
        productId: undefined,
      }  
      console.log(orderData)

      popup.then(()=>{
        this.popUp.success({detail:"Order placed" , summary: "Order placed successfully", duration:2000})
      })

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.getCartItem(item.id);
        }, 700)
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.cartData?.forEach((item)=>{
            setTimeout(()=>{
              item.id && this.product.deleteMyCart(item.id);
            }, 600)
          })
          this.orderMsg = "Order has been placed";
         
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders'])
          }, 5000);
          
        }
      })
    }
  }
}
