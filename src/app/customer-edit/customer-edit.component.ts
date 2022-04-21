import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from "../../environments/environment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  private apiURL = environment.apiURL;   
  customers: any = {}; 
  customerForm = new FormGroup({
    cust_name: new FormControl(''),
    cust_email: new FormControl(''),
    cust_phone: new FormControl(''),
    //inputState: new FormControl(''),
    cust_address: new FormControl(''),
  });
  constructor(private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) { }
  //add customer to the list
  addCustomer() {
    console.warn(this.customerForm.value);
    this.http
      .post<any>(this.apiURL + 'customers' ,{ customer: this.customerForm.value })
      .subscribe(
        response => {
          console.log('getCustomers:', response);
          if (response.status == 'success') {
            this.toastr.success(response.message);
            this.router.navigateByUrl('/customer-list');
          }
        },
        error => {
          this.toastr.error(error.error.message);
          console.log("Server Error:", error);

        }
      );
  }
  ngOnInit(): void {
  }

}
