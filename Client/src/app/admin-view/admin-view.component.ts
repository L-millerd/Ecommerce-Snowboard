import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../services/adminservice.service';
import { Product } from '../interfaces/products.interface';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})


export class AdminViewComponent implements OnInit {
  online:number;
  flexSwitchCheckDefault:boolean = true;
  checked = "flexSwitchCheckChecked";


  products:Product[] =[];

  constructor(private as:AdminserviceService) { }

  toggleLive(productID:number){

    this.as.toggleLive(productID).subscribe( response =>{
      console.log(response);
    })
  }

  ngOnInit(): void {
    this.as.displayProducts().subscribe( products =>{
      this.products = products;

     console.log(products);
    })
  }

}
