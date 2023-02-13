import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppServiceService } from 'src/app/service/app-service.service';
import { ProductService } from 'src/app/service/product.service';
import { cart, productsObj } from '../products/interface/data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems = 0;
  menuType: string = 'default';
  userName: string ="";
  searchResult:productsObj[] | undefined;
  cart : cart[] = []
  myLength:any
  val: any;
  constructor(private products:ProductService,
    private route : Router , private popUp: NgToastService , private appService:AppServiceService) { }

  ngOnInit(): void {
    
    this.ifd()
    this.products.cartData.subscribe((items)=>{
      this.cartItems = items.length
    })

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if(localStorage.getItem('user') && val.url){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
        }
         else {
          this.menuType = 'default';
        }
      }
    });
  }


  userLogout(){
    localStorage.removeItem('user')
    this.menuType = 'default'
    this.route.navigate(['/user-auth'])
    this.popUp.success({detail:"Logout" , summary: "User Logged out Successfully", duration:2000})
    this.products.cartData.emit([])
  }

  ifd(){
    let user = localStorage.getItem('user')
    if(user){
      let userId = user && JSON.parse(user).id
      this.products.getCartItem(userId)
    }
  }

  data(){
    this.products.currentCart().subscribe(result=>{
      this.cartItems = result.length
    })
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.appService.SearchProducts(element.value).subscribe(result=>{
        if(result.length>5){
          result.length=length
        }
        this.searchResult = result.products
      })}}

  hideSearch(){
    this.searchResult = undefined
  }


  redirectToDetails(id:number){
    this.route.navigate(['/details',id])
  }


}
