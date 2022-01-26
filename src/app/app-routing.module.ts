import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import {CustomerListComponent} from './customer-list/customer-list.component';
 import { OrderListComponent } from "./order-list/order-list.component";
// import {OrderEditComponent} from "./order-edit/order-edit.component"
// import { CustomersComponent } from "./customers/customers.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { ProductListComponent } from "./product-list/product-list.component";
// import { EditProductComponent } from "./edit-product/edit-product.component";

const routes: Routes = [
  { path: 'order-list', component: OrderListComponent},
  // {path: 'order-edit', component: OrderEditComponent},
   {path: 'customer-list', component:CustomerListComponent},
   {path: 'customer-edit', component:CustomerEditComponent},
   {path: 'product-list', component:ProductListComponent},
  // {path: 'edit-product', component:EditProductComponent},
  { path: '', component: DashboardComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
