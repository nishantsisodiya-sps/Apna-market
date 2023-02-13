import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { UsersServiceService } from 'src/app/service/users-service.service';
import { cart, login, productsObj, signUp } from '../products/interface/data';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true
  authError:string="";
  passShow = false;
  password : string = ""
  constructor(private user:UsersServiceService,
    private products : ProductService, private popUp : NgToastService) {}
    
    ngOnInit(): void {
      this.password = 'password';
    }

    eyeClick(){
      if(this.password === 'password'){
        this.password = 'text';
        this.passShow = true
      }else{
        this.password = 'password'
        this.passShow = false
      }
    }


    
    signUp(data:signUp){
      this.user.userSignUp(data)
  }

  login(data:login){
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result)=>{
      this.popUp.success({detail:"success message" , summary: "User logged in successfully", duration:2000})
      if(result){
        this.authError=""
        this.popUp.error({detail:"Failed" , summary: "User not found", duration:2000})
      }else{
        this.popUp.success({detail:"Success" , summary: "User logged in successfully", duration:2000})
        this.localstoragetoDb()
      }
    }
    )
  }


  openSignUp(){
    this.showLogin = false
  }

  openLogin(){
    this.showLogin = true
  }


  localstoragetoDb(){
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if(data){
    let myCart:productsObj[] = JSON.parse(data)

    myCart.forEach((product:productsObj, index) => {
      let cartData:cart={
        ...product,
        productId : product.id,
        userId
      };
      delete cartData.id;
      setTimeout(()=>{
        this.products.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("item stored in DB");
          }
        })
        }, 500);
        if(myCart.length === index+1){
        localStorage.removeItem('localCart')
        }
    });
    }
    setTimeout(()=>{
      this.products.getCartItem(userId)
    }, 2000)
  }
}
