import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  signup(user: User) {
    if (user.user_name !== '' && user.user_password !== '' && user.user_email !== '' && user.user_phone !== '') {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
 //get user
  getUser() {
    return this.loggedIn.asObservable();
  }
  
}