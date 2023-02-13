import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from '../interface/data';

@Component({
  selector: 'app-homedecoration',
  templateUrl: './homedecoration.component.html',
  styleUrls: ['./homedecoration.component.css']
})
export class HomedecorationComponent implements OnInit {

  productsObj : productsObj[] = []
  constructor(private fetchApi : AppServiceService) { }

  ngOnInit(): void {
    this.fetchApi.getItems('home-decoration').subscribe(res=>{
      this.productsObj = res.products
    })
  }

}
