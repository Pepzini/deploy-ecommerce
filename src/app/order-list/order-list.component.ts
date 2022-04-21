import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  private apiURL = environment.apiURL;

  orders: Array<any> = [];
  options: any;
  products: any = {};
  customers: any = {};
  content : any = {};
  formModal : any = {};
  formContent : any = {};
  orderForm = new FormGroup({
    order_id: new FormControl(),
    order_customer: new FormControl(),
    order_product: new FormControl(),
    order_quantity: new FormControl(),
    order_remarks: new FormControl(),
  });

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
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
  getOrders() {
    console.log('List of orders!');
    this.http.get<any>(this.apiURL + 'orders').subscribe(
      (response) => {
        console.log('getorders:', response);
        if (response.status == 'success') {
          this.orders = response.orders;
          this.toastr.success(response.message);
        }
      },
      (error) => {
        this.toastr.error('Error loading orders!');
        console.log('Server Error:', error);
      }
    );
  }
  showOrderDetails(content : any) {
    this.modalService.open(content, { centered: true });
  }

  showOrderEditForm(formModal: any, order: any) {
    this.modalService.open(formModal, { centered: true });
    this.orderForm.patchValue({
      order_id: order.order_id,
      order_customer: order.order_customer,
      order_product: order.order_product,
      order_quantity: order.order_quantity,
      order_remarks: order.order_remarks,
    });
  }

  editOrder() {
    console.warn(this.orderForm.value);
    this.http
      .put<any>(environment.apiURL + 'orders' , { order: this.orderForm.value })
      .subscribe(
        (response) => {
          console.log('edit:', response);
          if (response.status == 'success') {
            this.modalService.dismissAll();
            this.getOrders();
          }
        },
        (error) => {
          console.log('Server Error:', error);
        }
      );
  }
  deleteOrder(id: string) {
    this.http
      .delete<any>(this.apiURL + 'orders/' + id)
      .subscribe((response) => {
        console.log('delete orders', response);
        if (response.status == 'success') {
          console.log('product deleted');
          this.toastr.success('Order deleted successfully!');
          this.getOrders();
        } else {
          this.toastr.error('Error deleting order!');
          console.log('unable to delete');
        }
      });
  }
  ngOnInit(): void {
    this.getOrders();
    this.getCustomers();
    this.getProducts();
  }
}
