import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from '../interface/data';


@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.css']
})
export class SmartphonesComponent implements OnInit {
  
  productsObj:productsObj[] = []

  constructor(private fetchApi : AppServiceService,
    private ActivatedRoute : ActivatedRoute) {}

  ngOnInit(): void {

    let para = this.ActivatedRoute.snapshot.paramMap.get(' item')
    console.log(para);

    this.fetchApi.getItems(para).subscribe(res=>{
      this.productsObj = res.products
    })
  }
}
