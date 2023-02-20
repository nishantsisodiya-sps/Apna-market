import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {


  constructor(private http:HttpClient) {} 

    getProducts():Observable<any>{
      return this.http.get('https://dummyjson.com/products');
    } 

    getSingleProduct(id:number){
      return this.http.get<any>('https://dummyjson.com/products/'+id+'');
    }

    getItems(category:any){
      return this.http.get<any>('https://dummyjson.com/products/category/'+category)
    }

    mainProduct(){
      return this.http.get<any>('https://dummyjson.com/products/?limit=5');
    }
    SearchProducts(query:string){
      return this.http.get<any>(`https://dummyjson.com/products/search?q=${query}`);
    }

    myImages(id:number){
      return this.http.get<any>('https://i.dummyjson.com/data/products/'+id)
    }

    getCategories():Observable<any>{
      return this.http.get('https://dummyjson.com/products/categories');
    }

}
