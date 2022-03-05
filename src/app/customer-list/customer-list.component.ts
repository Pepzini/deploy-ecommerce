import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private apiURL = environment.apiURL;

  customers: Array<any> = [];
  content : any = {};
  formModal : any = {};
  options: any;
customerForm = new FormGroup({
  cust_id: new FormControl(),
  cust_name: new FormControl(),
  cust_address: new FormControl(),
  cust_phone: new FormControl(),
  cust_email: new FormControl(),
});
  constructor(private http: HttpClient, private modalService: NgbModal) {}
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
  showCustomerEditForm(formModal: any, customer: any) {
    this.modalService.open(formModal, { centered: true });
    this.customerForm.patchValue({
      cust_id: customer.cust_id,
      cust_name: customer.cust_name,
      cust_address: customer.cust_address,
      cust_phone: customer.cust_phone,
      cust_email: customer.cust_email,
    });
  }
 editCustomer() {
    this.http
      .put<any>(this.apiURL + 'customers', {customer: this.customerForm.value})
      .subscribe((response) => {
        console.log('edit customer', response);
        if (response.status == 'success') {
          console.log('customer edited');
          this.modalService.dismissAll();
          this.getCustomers();
        } else {
          console.log('unable to edit');
        }
      });
  }
  ngOnInit(): void {
    this.getCustomers();
  }

}
