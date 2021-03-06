import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedInUser: any = {};
  get isLoggedIn() {
      console.log("isLoggedIn=",this.loggedIn.asObservable());
      return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.user_name !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      console.log("loggedin=",this.loggedIn);
      localStorage.setItem('user', JSON.stringify(user));
      // this.loggedInUser = user;
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  signup(user: User) {
    if (user.user_name !== '' && user.user_password !== '' && user.user_email !== '' && user.user_phone !== '') {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
  //get current user from local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  //update current user
  // updateCurrentUser(user: User) {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.loggedInUser = user;
  // }

  //refresh current user
  // refreshCurrentUser() {
  //   this.loggedInUser = this.getCurrentUser();
  // }
  
}