import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/service/users-service.service';
import { signUp } from '../products/interface/data';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  showLogin=false;
  authError:String='';
  constructor(private user :UsersServiceService) { }

  ngOnInit(): void {
    // this.user.reloadusers
  }
  // signUp(data: signUp): void {
  //   console.warn(data);
  //   this.user.userSignUp(data);
  // }
  // login(data: signUp): void {
  //   this.user.userLogin(data);
  //   this.user.isLoginError.subscribe((isError)=>{
  //     if(isError){
  //       this.authError="Email or password is not correct";
  //     }
  //   })
  // }
  // openLogin(){
  //   this.showLogin=true
  // }
  // openSignUp(){
  //   this.showLogin=false
  // }
}
