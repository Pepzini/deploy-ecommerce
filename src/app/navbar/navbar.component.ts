import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   user: any = {};
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) { 
     //display current user
     this.user = this.authService.getCurrentUser();

  }

  ngOnInit() {
    this.isLoggedIn$! = this.authService.isLoggedIn;
    this.displayUser();
    // this.onRefresh();
  }

  onLogout() {
    this.authService.logout();
  }

  //display current user
  displayUser() {
    this.user = this.authService.getCurrentUser();
     console.log('CurrentUser:', this.user);
   }
}
