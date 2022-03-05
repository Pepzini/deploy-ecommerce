import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  constructor(private authService: AuthService) { }
  login() {
    this.authService.login(this.loginForm.value);
  }
  ngOnInit(): void {
  }

}
