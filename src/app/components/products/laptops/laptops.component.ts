import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from '../interface/data';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css']
})
export class LaptopsComponent implements OnInit {

  productsObj:productsObj[] = []

  constructor(private fetchApi: AppServiceService) { }

  ngOnInit(): void {
    this.fetchApi.getItems('laptops').subscribe(res=>{
      this.productsObj = res.products
    })
  }

}
