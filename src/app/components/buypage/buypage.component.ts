import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppServiceService } from 'src/app/service/app-service.service';
import { ProductService } from 'src/app/service/product.service';
import { productsObj, cart } from '../products/interface/data';

@Component({
  selector: 'app-buypage',
  templateUrl: './buypage.component.html',
  styleUrls: ['./buypage.component.css']
})
export class BuypageComponent implements OnInit {
  productData: undefined | productsObj;
  productQuantity: number = 1;
  quantity: number = 1
  products: productsObj[] = []
  cartData: productsObj | undefined;
  removeCart= false;
  constructor(private _fetchapi: AppServiceService,
    private ActivatedRoute: ActivatedRoute,
    private _productService: ProductService , private popUp:NgToastService) { }

  ngOnInit(): void {
    let pId = +this.ActivatedRoute.snapshot.paramMap.get(' id');
      this._fetchapi.getSingleProduct(pId).subscribe(res => {
        this.products[0] = res
        
        
        let cartData = localStorage.getItem('localCart')
        if (pId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((items: productsObj) => pId == items.id)
          if(items.length){
            this.removeCart=true
          }else{
            this.removeCart=false
          }
        }


        let user = localStorage.getItem('user')
        if(user){
          let userId = user && JSON.parse(user).id
          this._productService.getCartItem(userId)
          this._productService.cartData.subscribe((result)=>{
        let items = result.filter((items:productsObj)=> pId == items.id)
        if(items.length){
          this.cartData = items[0]
          this.removeCart = true
        }
      }
      )
    }
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1
    }
  }


  AddToCart() {
    this.popUp.info({detail:"Added to Cart" , summary: "Product added successfully", duration:2000})
    if (this.products) {
      this.products[0].quantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        this._productService.localAddToCart(this.products)
        this.removeCart = true
      } else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        let cartData: cart = {
          ...this.products[0],
          userId,
          productId: this.products[0].id
        }
        delete cartData.id
        this._productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this._productService.getCartItem(userId)
            this.removeCart = true
          }
        })

      }
    }
  }


  removeToCart(pId:number){
    this.popUp.warning({detail:"Removed from Cart" , summary: "Product Removed", duration:2000})
    if(!localStorage.getItem('user')){
      this._productService.removeFromCart(pId)
    }else{
      console.warn(this.cartData?.id);      
      this.cartData && this._productService.removeCart(this.cartData.id)
      .subscribe((result)=>{
        if(result){
          let user = localStorage.getItem('user');
          let userId= user && JSON.parse(user).id;
          this._productService.getCartItem(userId)
          this.removeCart=false
        }
      })
    }
  }
}