import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private apiURL = environment.apiURL;

  products: Array<any> = [];
  options: any;

  constructor(private http: HttpClient) {}
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
  deleteProduct(id: string) {
    this.http
      .delete<any>(this.apiURL + 'products/' + id)
      .subscribe((response) => {
        console.log('delete product', response);
        if (response.status == 'success') {
          console.log('product deleted');
          this.getProducts();
        } else {
          console.log('unable to delete');
        }
      });
  }
  showProductDetails(id: string) {
    console.log('showProduct:', id);
    this.http.get<any>(this.apiURL + 'products/' + id).subscribe(
      (response) => {
        console.log('showProductDetails:', response);
        if (response.status == 'success') {
          this.products = response.products;
        }
      },
      (error) => {
        console.log('Server Error:', error);
      }
    );
  }
 
  ngOnInit(): void {
    this.getProducts();
  }
}
