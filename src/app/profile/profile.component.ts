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
      this.user = this.authService.getCurrentUser();
      console.log('CurrentUser:', this.user);
    
    }
 

  //display user
  displayUser() {
    this.profileForm.patchValue({
      user_id: this.user.user_id,
      user_name: this.user.user_name,
      user_email: this.user.user_email,
      user_phone: this.user.user_phone,
      user_address: this.user.user_address,
    });
  }
  //update user
  updateUser() {
    this.http.put<any>(this.apiURL + 'users/', {user: this.profileForm.value}).subscribe(
      (response) => {
        console.log('user:', response);
        if (response.status == 'success') {
          this.toastr.success(response.message);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.toastr.error(error.message);
        console.log('Server Error:', error);
      }
    );
  }
  ngOnInit(): void {
  //  this.getUser(this.user.user_id);
    this.displayUser();
    console.log('user:', this.user);
  }

}
