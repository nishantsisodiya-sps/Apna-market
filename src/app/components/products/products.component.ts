import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from './interface/data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  productsObj: productsObj[] = [];

  constructor(private myService: AppServiceService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.myService.getProducts().subscribe(res => {
      this.productsObj = res.products
    })
    this.ActivatedRoute.paramMap.subscribe(param => {
      let pId = +param.get(' id');

      this.myService.getSingleProduct(pId).subscribe(result => {
        this.productsObj[0] = result;
      })
    })
  }
}
