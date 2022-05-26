import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private apiURL = environment.apiURL;
  returnUrl: string | undefined;

   loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
 
  constructor(
    private authService: AuthService, 
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService) { }
  login() {
    this.spinner.show();
    this.http.post<any>(this.apiURL + 'auth/user/login', this.loginForm.value).subscribe(
      (response) => {
        console.log('login:', response);
        if (response.status == 'success') {
          this.spinner.hide();
          this.authService.loggedInUser = response.user;
          this.authService.login(response.user);
          this.toastrService.success(response.message);
          // this.router.navigate(['/']);
          this.router.navigate([this.returnUrl]);
        } else if (response.status == 'error') {
          this.spinner.hide();
          this.toastrService.error(response.message);  
        }
      },
      (error) => {
        this.spinner.hide();
        console.log('error:', error);
      }
    );
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
