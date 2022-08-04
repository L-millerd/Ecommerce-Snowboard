import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../services/adminservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  image: string = '';
  image2: string = '';
  image3: string = '';
  image4: string = '';
  image5: string = '';
  title: string = '';
  description: string = '';
  price: number;
  stock: number;

  showMessage = "none"
  addedProduct: boolean = false;
  addedMessage: any = '';

  constructor(private as:AdminserviceService) { }

  addProduct(){
    this.as.addProduct(
      this.image,
      this.image2,
      this.image3,
      this.image4,
      this.image5,
      this.title,
      this.description,
      this.price,
      this.stock).subscribe(addedData =>{
        console.log(addedData);
        this.addedProduct = addedData.addProduct;
        this.addedMessage = addedData.message;
        this.showMessage = "block";
      })
  }

  ngOnInit(): void {
  }

}
