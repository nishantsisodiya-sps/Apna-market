export interface productsObj{
    id: number ,
    title: string ,
    description: string, 
    price: number ,
    discountPercentage: number, 
    rating: number ,
    stock: number ,
    brand: string,
    category: string ,
    thumbnail: string,
    quantity : undefined | number,
    productId:undefined|number,
    images : [
        
    ]
}
export interface signUp {
    name: string;
    email: string;
    password: string;
  }
export interface login {
    email: String;
    password: String;
}
export interface cart{
    id: number | undefined ,
    title: string ,
    description: string, 
    price: number ,
    discountPercentage: number, 
    rating: number ,
    stock: number ,
    brand: string,
    category: string ,
    thumbnail: string,
    quantity : undefined | number,
    userId : number,
    productId : number | undefined
}
export interface price{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order {
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
    thumbnail: string,
    productId : number | undefined
  }

export interface typeDeliver{
    value : string,
    viewValue : string
}
export interface orderedData{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
    thumbnail: string,
    name : string,
    productId : number | undefined
}


