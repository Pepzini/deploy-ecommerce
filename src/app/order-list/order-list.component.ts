import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  private apiURL = environment.apiURL;
 
  orders: Array<any> = [];
  options: any;

  constructor(private http: HttpClient) {}
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
 deleteOrder(id: string) {
    this.http.delete<any>(this.apiURL + 'orders/' + id).subscribe((response) => {
      console.log('deleteOrder:', response);
      if (response.status == 'success') {
        console.log('order deleted');
      } else {
        console.log('unable to delete');
    }
  });
  }
  ngOnInit(): void {
    this.getorders();
  }

}
