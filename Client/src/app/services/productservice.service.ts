import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/products.interface'

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  private url = "http://localhost:4400/womens"

  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id:number){
    return this.http.get<Product>(this.url + '/' + id);
  }
}
