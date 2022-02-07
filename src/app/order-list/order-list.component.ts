import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  private apiURL = environment.apiURL;
  content : any = {};
  orders: Array<any> = [];
  options: any;

  constructor(private http: HttpClient, private modalService: NgbModal) {}
  getorders() {
    console.log('List of orders!');
    this.http.get<any>(this.apiURL + 'orders').subscribe(
      (response) => {
        console.log('getorders:', response);
        if (response.status == 'success') {
          this.orders = response.orders;
        }
      },
      (error) => {
        console.log('Server Error:', error);
      }
    );
  }
  showOrderDetails(content : any, id: string) {
    this.modalService.open(content, { centered: true });
    this.http.get<any>(this.apiURL + 'orders/' + id).subscribe(
      (response) => {
        console.log('showOrderDetails:', response);
        if (response.status == 'success') {
          this.content = response.order;
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
          this.getorders();
        } else {
          console.log('unable to delete');
        }
      });
  }
  ngOnInit(): void {
    this.getorders();
  }

}
