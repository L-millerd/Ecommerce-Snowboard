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

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe( womens => {
      this.womens = womens;
    })
  }

}
