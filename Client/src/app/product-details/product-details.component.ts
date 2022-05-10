import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/products.interface';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  singleProduct:Product;

  womens:Product[]=[];

  imagesArray:any[]=[];

  constructor(private route: ActivatedRoute, private ps:ProductserviceService) { }


  ngOnInit(): void {
    let id:any = this.route.snapshot.paramMap.get("id");

    this.ps.getProductById(id).subscribe( singleProduct =>  {
      this.singleProduct = singleProduct;
      // console.log(this.singleProduct)
    });

    this.ps.getAllProducts().subscribe( womens => {
      this.womens = womens;
      console.log(womens);
    })


    this.imagesArray.push(this.singleProduct.image, this.singleProduct.image2, this.singleProduct.image3);



  }

}
