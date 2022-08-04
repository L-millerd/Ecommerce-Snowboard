import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';

const routes: Routes = [
  { path: 'womens', component: ProductsComponent },
  { path: 'womens/:id', component: ProductDetailsComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'admin-view', component: AdminViewComponent},
  { path: 'admin-add', component: AdminAddComponent},
  { path: 'admin-edit/:id', component: AdminEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
