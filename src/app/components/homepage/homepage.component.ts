import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/service/app-service.service';
import { productsObj } from '../products/interface/data';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // panelOpenState =false
  title = 'E-Comm'
  mainProducts : undefined|productsObj[]
  productsObj : productsObj[] = []
  constructor( private _fetchApi:AppServiceService) { }

  ngOnInit(): void {
    this._fetchApi.mainProduct().subscribe((result)=>{
      this.mainProducts = result.products
    })
  }

}
