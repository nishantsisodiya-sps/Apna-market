import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from '../interface/data';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent implements OnInit {
  router: any;
  productQuantity: number =1;
  


  constructor(private ActivatedRoute : ActivatedRoute,
    private fetchApi:AppServiceService,
    private products : ProductService) { }

    productsObj:productsObj[]=[]

  ngOnInit(): void {
    
    this.ActivatedRoute.paramMap.subscribe(param=>{
        let pId = +param.get(' id')
        
        this.fetchApi.getSingleProduct(pId).subscribe(result=>{
          this.productsObj[0] = result
        })
      })
  }
}
