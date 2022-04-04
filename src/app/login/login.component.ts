import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private apiURL = environment.apiURL;
   loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }
  // login() {
  //   this.authService.login(this.loginForm.value);
  // }
  login() {
    this.http.post<any>(this.apiURL + 'auth/user/login', this.loginForm.value).subscribe(
      (response) => {
        console.log('login:', response);
        if (response.status == 'success') {
          this.authService.login(response.user);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log('Server Error:', error);
      }
    );
  }
  ngOnInit(): void {
  }

}
