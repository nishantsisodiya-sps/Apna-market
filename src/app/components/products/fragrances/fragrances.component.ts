import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from '../interface/data';
@Component({
  selector: 'app-fragrances',
  templateUrl: './fragrances.component.html',
  styleUrls: ['./fragrances.component.css']
})
export class FragrancesComponent implements OnInit {

  productsObj:productsObj[]=[]
  constructor(private fetchApi : AppServiceService) { }

  ngOnInit(): void {

    this.fetchApi.getItems('fragrances').subscribe(res=>{
      this.productsObj = res.products
    })

  }

}
