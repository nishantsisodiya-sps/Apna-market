import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signUp } from '../components/products/interface/data';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  isUserLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)
invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http : HttpClient, private router:Router) { }
  
  userSignUp(user:signUp){
    this.http.post('http://localhost:3000/users' , user ,{observe : 'response'})
    .subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/home'])
      }
    })
  }
 
 
  userLogin(data:login){
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/home']);
        this.invalidUserAuth.emit(false)
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }

   }
  

