import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/service/product.service';
import { cart, order, price, typeDeliver } from '../products/interface/data';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

// dropdown values for paymentType dropdown

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

  // Ng If values

  showSpinner : boolean = false
  creditShow : boolean = false
  debitShow : boolean = false
  UPIShow : boolean = false

  //Validation 

  shipDetails = new FormGroup({
    firstName :   new FormControl(null, [Validators.required]),
    lastName :   new FormControl(null, [Validators.required]),
    street :   new FormControl(null, [Validators.required]),
    city :   new FormControl(null, [Validators.required]),
    state :   new FormControl(null, [Validators.required]),
    zip :   new FormControl(null, [Validators.required]),
    paymentType :   new FormControl([Validators.required]),
    upi : new FormControl(''),
    CreditCardNo : new FormControl(null , [Validators.required , Validators.minLength(16), Validators.maxLength(16)]),
    Creditexp : new FormControl(''),
    Creditcvv : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(3)]),
    DebitcardNo : new FormControl(null , [Validators.required , Validators.minLength(16), Validators.maxLength(16)]),
    Debitexp : new FormControl(''),
    Debitcvv : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(3)])
  });


  constructor(private product : ProductService , private router : Router , private popUp: NgToastService) { }

  ngOnInit(): void {
    this.totalPriceCalculate()
  }

  //Submitting form and sending data of cart to oder place API


  orderNow(){
    console.log(this.shipDetails.value);
    let data = this.shipDetails.value
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
        email: '',
        address: '',
        contact: ''
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
  
  // Navigation to cart function

  backtoCart(){
    this.router.navigate(['/cart'])
  }

  //Dropdown values show hide divs working function

  onSelectionChange(event:any) {
    if(event.value == "Credit card"){
      this.creditShow = true
      this.UPIShow = false
      this.debitShow = false
    }else if(event.value == "UPI"){
      this.UPIShow = true
      this.creditShow = false
      this.debitShow = false
    }else if(event.value == "Debit Card"){
      this.debitShow = true
      this.UPIShow = false
      this.creditShow = false
    }else{
      this.debitShow = false
      this.UPIShow = false
      this.creditShow = false
    }
  }

  //Price calculation getting from Cart

  totalPriceCalculate(){
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
}