import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private apiURL = environment.apiURL;
  user: any = {};

  profileForm = new FormGroup({
    user_id: new FormControl(),
    user_name: new FormControl(),
    user_email: new FormControl(),
    user_phone: new FormControl(),
    user_address: new FormControl(),
  });

 constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) {
      this.user = this.authService.getUser();
    }
  //get current user from the api
  getUser(id: number) {
    console.log('getUser:', id);
    this.http.get<any>(this.apiURL + 'users/' + id).subscribe(
      (response) => {
        console.log('getUser:', response);
        if (response.status == 'success') {
          this.user = response.user;
          this.toastr.success(response.message);
        }
      },
      (error) => {
        this.toastr.error(error.message);
        console.log('Server Error:', error);
      }
    );
  }
  ngOnInit(): void {
   this.getUser(this.user.user_id);
  }

}
