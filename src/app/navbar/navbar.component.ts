import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { AuthGuard } from './../auth/auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   user: any = {};
  isLoggedIn: any;


  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard,
    ) { 
    //display current user
     this.user = this.authService.getCurrentUser();

  }

  ngOnInit() {
    this.displayUser();
    // this.onRefresh();
    this.isLoggedIn = localStorage.getItem('user');
    console.log("this.isLoggedIn=",this.isLoggedIn);
    
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
