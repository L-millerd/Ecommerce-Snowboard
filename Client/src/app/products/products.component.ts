import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/products.interface';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  womens:Product[] = []

  constructor(private ps:ProductserviceService) { }

  lowHigh(){
    this.womens.sort(function(a,b){
      return a.price - b.price;
    })
  }

  highLow(){
    this.womens.sort(function(a,b){
      return b.price - a.price;
    })
  }

  available(){
    this.womens = this.womens.filter(product =>{
      return product.stock >= 1;
    })

  }

  allProducts(){
    this.ps.getAllProducts().subscribe( womens => {
      this.womens = womens;
    })
  }
  ngOnInit(): void {
    this.allProducts();
  }

}
