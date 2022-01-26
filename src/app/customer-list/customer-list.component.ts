import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private apiURL = environment.apiURL;

  customers: Array<any> = [];
  options: any;

  constructor(private http: HttpClient) {}
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

  deleteCustomer(id: string) {
    this.http
      .delete<any>(this.apiURL + 'customers/' + id)
      .subscribe((response) => {
        console.log('delete customer', response);
        if (response.status == 'success') {
          console.log('customer deleted');
          this.getCustomers();
        } else {
          console.log('unable to delete');
        }
      });
  }
  ngOnInit(): void {
    this.getCustomers();
  }

}
