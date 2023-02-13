import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/service/product.service';
import { cart, order } from '../products/interface/data';
import { price } from '../products/interface/data';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orderData : order[] | undefined
  priceSummary: price = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  cartData: cart[] | undefined;
  pending = true
  constructor(private _fetchApi : ProductService , private popUp : NgToastService) { }

  ngOnInit(): void {
    this.getOrderList()
}

cancelOrder(orderId:number|undefined){
  console.log(orderId)
  orderId && this._fetchApi.cancleOrder(orderId).subscribe((result)=>{
    this.popUp.warning({detail:"Order Canceled" , summary: "Order cancelled successfully", duration:2000})
      this.getOrderList()
  })
}




getOrderList(){
  this._fetchApi.myOrders().subscribe((result)=>{
    this.orderData = result
  })
  setTimeout(() => {
    this.pending = false
  }, 100000);
}


}
