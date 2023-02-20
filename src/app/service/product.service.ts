import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, orderedData, productsObj } from '../components/products/interface/data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<productsObj[] | []>();
  OrderData = new EventEmitter<productsObj[] | []>();

  orderedData : orderedData[] = []
  constructor(private http: HttpClient) { }

  localAddToCart(data:any){
    let CartData = [];
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart' , JSON.stringify([data]))
    }else{
      CartData = JSON.parse(localCart);
      CartData.push(data)
      localStorage.setItem('localCart' , JSON.stringify(CartData))
    }
    this.cartData.emit(CartData);
  }

  removeFromCart(pId:number){
    let CartData = localStorage.getItem('localCart')
    if(CartData){
      let items:productsObj[] = JSON.parse(CartData);
      items = items.filter((item:productsObj)=>{
        pId!==item.id
      })
    }
  }

  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart', cartData)
  }

  getCartItem(userId:number){
    return this.http.get<productsObj[]>('http://localhost:3000/cart?userId=' + userId,
    {observe: 'response',}).subscribe((result)=>{
      if(result && result.body)
      this.cartData.emit(result.body);
    })
  }

  removeCart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/' + cartId)
  }

  currentCart(){
    let myUser = localStorage.getItem('user');
    let userData = myUser && JSON.parse(myUser)
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data:order){
    return this.http.post('http://localhost:3000/orders' , data);
  }

  myOrders(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+ userData.id);
  }

  deleteMyCart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/' + cartId , {observe : 'response'}).subscribe((result)=>{
    if(result){
    this.cartData.emit([])
    }
    })
  }

  cancleOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+ orderId)
  }


  myOrderData(data:order){
    return this.http.post('http://localhost:3000/myOrderData' , data);
  }

  GetOrderData(userId:any){
    return this.http.get<any>('http://localhost:3000/myOrderData/' + userId ,
    {observe: 'response',}).subscribe(result=>{
    })
  }

  }

