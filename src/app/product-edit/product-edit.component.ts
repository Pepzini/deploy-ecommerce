import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  private apiURL = environment.apiURL;
  products: any = {};
  productForm = new FormGroup({
    product_name: new FormControl(''),
    product_origin: new FormControl(''),
    product_fragrance: new FormControl(''),
    product_category: new FormControl(''),
  });
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}
  //add product to the list
  addProduct() {
    console.warn(this.productForm.value);
    this.http
      .post<any>(this.apiURL + 'products', { product: this.productForm.value })
      .subscribe(
        (response) => {
          console.log('getproducts:', response);
          if (response.status == 'success') {
            this.router.navigateByUrl('/product-list');
          }
        },
        (error) => {
          console.log('Server Error:', error);
        }
      );
  }
  ngOnInit(): void {}

}
