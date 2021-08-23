import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  //geting all product
  getproduct(){
    return this.http.get('https://product-list-ap.glitch.me/api/product');

  }
  //adding data
  addproduct(Id:string,name:string,price:number,created:string){
       return this.http.post('https://product-list-ap.glitch.me/api/product',{'Id':Id,'name':name,'price':price,'created':created});
  }
  deleteproduct(id:any){
    return this.http.delete('https://product-list-ap.glitch.me/api/product/'+id);
  }
  updateproduct(id:any,Id:string,name:string,price:string,created:string){
    return this.http.put('https://product-list-ap.glitch.me/api/product/'+id,{'Id':Id,'name':name,'price':price,created:created});
  }
}
