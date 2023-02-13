import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from '../interface/data';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent implements OnInit {
  productQuantity: number =1;
  arr : [] = []


  constructor(private ActivatedRoute : ActivatedRoute,
    private fetchApi:AppServiceService) { }

    productsObj:productsObj[]=[]

  ngOnInit(): void {
    
    this.ActivatedRoute.paramMap.subscribe(param=>{
        let pId = +param.get(' id')

        this.fetchApi.getSingleProduct(pId).subscribe(result=>{
          this.productsObj[0] = result
          let image = this.productsObj[0].images
          image.forEach(item=>{
            this.arr.push(item)
          })
        })
      })
  }

  changeImage(element:any,i:any){
    this.productsObj[0].thumbnail = element.arr[i]
  }
}
