import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private apiURL = environment.apiURL;
  user: any = {};
  products: Array<any> = [];
  customers: Array<any> = [];
  orders: Array<any> = [];
  options: any;

  constructor(private http: HttpClient, private authService: AuthService,) {
    this.user = this.authService.getCurrentUser();
  }
  //count products from the api
  countProducts() {
    this.http.get<any>(this.apiURL + 'products').subscribe((response) => {
      console.log('countProducts:', response);
      if (response.status == 'success') {
        this.products = response.products;
      }
      console.log('countProducts:', this.products.length);
    });
  }
 //count customers from the api
  countCustomers() {
    this.http.get<any>(this.apiURL + 'customers').subscribe((response) => {
      console.log('countCustomers:', response);
      if (response.status == 'success') {
        this.customers = response.customers;
      }
      console.log('countCustomers:', this.customers.length);
    });
  }
  //count orders from the api
  countOrders() {
    this.http.get<any>(this.apiURL + 'orders').subscribe((response) => {  
      console.log('countOrders:', response);
      if (response.status == 'success') {
        this.orders = response.orders;
      } 
      console.log('countOrders:', this.orders.length);
    });
  }
  //display current user
   displayUser() {
     this.user = this.authService.getCurrentUser();
      console.log('CurrentUser:', this.user);
    }

  ngOnInit(): void {
    this.countProducts();
    this.countCustomers();
    this.countOrders();
    this.displayUser();
  }
}