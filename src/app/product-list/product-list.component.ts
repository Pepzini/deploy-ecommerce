import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  private apiURL = environment.apiURL;
  products: Array<any> = [];
  content : any = {};
  formModal : any = {};
  formContent : any = {};
  options: any;
  productForm = new FormGroup({
    product_id: new FormControl(),
    product_name: new FormControl(),
    product_origin: new FormControl(),
    product_fragrance: new FormControl(),
    product_category: new FormControl(),
    product_price: new FormControl(),
    product_details: new FormControl(),
  });
  constructor(private http: HttpClient,
     private modalService: NgbModal,
     private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }
  //get products from the api
  getProducts() {
    console.log('List of products!');
    this.http.get<any>(this.apiURL + 'products').subscribe(
      (response) => {
        console.log('getProducts:', response);
        if (response.status == 'success') {
          this.products = response.products;
          this.toastr.success(response.message);
        }
      },
      (error) => {
        this.toastr.error(error.message);
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
  showProductDetails(content : any) {
    this.modalService.open(content, { centered: true });
  }

  showProductEditForm(formModal : any, product: any) {
    this.modalService.open(formModal, { centered: true });
    this.productForm.patchValue({
      product_id: product.product_id,
      product_name: product.product_name,
      product_category: product.product_category,
      product_origin: product.product_origin,
      product_price: product.product_price,
      product_fragrance: product.product_fragrance,
      product_details: product.product_details
    });
  }

  editProduct() {
    console.warn(this.productForm.value);
    this.http
      .put<any>(environment.apiURL + 'products', { product: this.productForm.value })
      .subscribe(
        (response) => {
          console.log('edit:', response);
          if (response.status == 'success') {
            this.toastr.success(response.message);
            this.modalService.dismissAll();
            this.getProducts();
          }
        },
        (error) => {
          this.toastr.error(error.message);
          console.log('Server Error:', error);
        }
      );
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
