import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../services/adminservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
email: string='';
password: string='';
loginStatus = false;
showMessage = "none";

  constructor(private as:AdminserviceService, private router: Router) { }

  login(){
  this.as.loginService(this.email, this.password).subscribe( loginData =>{
    this.loginStatus= loginData.login;
    if(loginData.login){

      this.router.navigate(['/admin-view']);
      localStorage.setItem("adminUser", JSON.stringify(loginData.data[0].email));
    }
    else{
      this.showMessage = "block";
    }
    })
  }


  ngOnInit(): void {
  }

}
