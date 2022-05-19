import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLoggedIn: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.getCurrentUser();
  }
}
