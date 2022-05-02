import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
})
export class OrderEditComponent implements OnInit {
  private apiURL = environment.apiURL;
  products: any = {};
  customers: any = {};
  orderForm = new FormGroup({
    order_customer: new FormControl(''),
    order_product: new FormControl(''),
    order_quantity: new FormControl(''),
    order_remarks: new FormControl(''),
  });
  constructor(private http: HttpClient,
     private router: Router,
     private route: ActivatedRoute,
     private toastr: ToastrService
     ) {}
  //get products from the api
  getProducts() {
    console.log('List of products!');
    this.http.get<any>(this.apiURL + 'products').subscribe(
      (response) => {
        console.log('getProducts:', response);
        if (response.status == 'success') {
          this.products = response.products;
        }
      },
      (error) => {
        console.log('Server Error:', error);
      }
    );
  }
  //get customers from the api
  getCustomers() {
    console.log('List of customers!');
    this.http.get<any>(this.apiURL + 'customers').subscribe(
      (response) => {
        console.log('getCustomers:', response);
        if (response.status == 'success') {
          this.customers = response.customers;
        }
      },
      (error) => {
        console.log('Server Error:', error);
      }
    );
  }
  addOrder() {
    console.log(this.orderForm.value);
    this.http
      .post<any>(this.apiURL + 'orders', { order: this.orderForm.value })
      .subscribe(
        (response) => {
          console.log('addOrders:', response);
          if (response.status == 'success') {
            this.toastr.success('Order added successfully!');
            this.router.navigateByUrl('/order-list');
          }
        },
        (error) => {
          this.toastr.error('Unable to add your order, please try again!');
          console.log('Server Error:', error);
        }
      );
  }
  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
  }
}
