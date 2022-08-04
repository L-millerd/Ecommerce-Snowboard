import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../services/adminservice.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/products.interface';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  image: string = '';
  image2: string = '';
  image3: string = '';
  image4: string = '';
  image5: string = '';
  title: string = '';
  description: string = '';
  price: number;
  stock: number;


  deleted:Boolean = false;
  edited: Boolean = false;
  online: Boolean = false;

  showEditMessage: string = "none";
  showDeleteMessage: string = "none";
  editError: any = '';

  // singleProduct:Product;

  constructor(private as:AdminserviceService, private route:ActivatedRoute) { }

  deleteProduct(){
    if(confirm("Are you sure? Deleting this product will be permanent")){
      let productID = this.route.snapshot.paramMap.get("id");
      this.as.deleteProduct(productID).subscribe( response =>{
      // console.log(response);
      this.showDeleteMessage = "block";
      this.deleted = response.deleted;
      })

    }
  }

  editProduct(){
    let productID = this.route.snapshot.paramMap.get("id");
    console.log(productID);
    this.as.editProduct(
      productID,
      this.image,
      this.image2,
      this.image3,
      this.image4,
      this.image5,
      this.title,
      this.description,
      this.price,
      this.stock).subscribe( response =>{
        console.log(response);
        this.edited = response.edited;
        this.showEditMessage = "block";
        this.editError = response.message;
      })
  }

  ngOnInit(): void {
    let productID:any = this.route.snapshot.paramMap.get("id");
    // localStorage.setItem("productID", JSON.stringify())
    this.as.getProductID(productID).subscribe( singleProduct => {
      // this.singleProduct = singleProduct;
      this.title = singleProduct.title;
      this.image = singleProduct.image;
      this.image2 = singleProduct.image2;
      this.image3 = singleProduct.image3;
      this.image4 = singleProduct.image4;
      this.image5 = singleProduct.image5;
      this.description = singleProduct.description;
      this.price = singleProduct.price;
      this.stock = singleProduct.stock;
      // console.log(this.singleProduct)
    });

  }

}
