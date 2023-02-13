import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from '../interface/data';

@Component({
  selector: 'app-skincare',
  templateUrl: './skincare.component.html',
  styleUrls: ['./skincare.component.css']
})
export class SkincareComponent implements OnInit {

  productsObj:productsObj[] = []

  constructor(private fetchApi: AppServiceService) { }

  ngOnInit(): void {
    this.fetchApi.getItems('skincare').subscribe(res=>{
      this.productsObj = res.products
    })
  }

}
