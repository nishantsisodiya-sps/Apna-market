import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from '../interface/data';
@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.css']
})
export class GroceriesComponent implements OnInit {

  productsObj:productsObj[]=[]
  
  constructor(private fetchApi : AppServiceService) { }

  ngOnInit(): void {

    this.fetchApi.getItems('groceries').subscribe(res=>{
      this.productsObj = res.products
    })

  }

}
