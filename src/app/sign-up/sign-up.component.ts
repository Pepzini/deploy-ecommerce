import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  private apiURL = environment.apiURL;
  signUpForm = new FormGroup({
    user_name: new FormControl(),
    user_email: new FormControl(),
    user_password: new FormControl(),
    user_phone: new FormControl()
  });

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService
    ) { }
  
  signUp() {
    console.log('signUp:', this.signUpForm.value);
    this.http.post<any>(this.apiURL + 'auth/user/register', {user: this.signUpForm.value}).subscribe(
      (response) => {
        console.log('signUp:', response);
        if (response.status == 'success') {
          this.authService.signup(response.user);
          this.toastrService.success(response.message);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.toastrService.error(error.error.message);
        console.log('Server Error:', error);
      }
    );
  }
  ngOnInit(): void {
  }

}
