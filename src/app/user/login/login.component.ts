import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { AuthService } from '../../shared/auth.service';
import { IUser } from '../common/IUser.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName
  password
  mouseoverLogin
  loginInvalid = false

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private cookie: CookieService) { }

  ngOnInit(): void {

  }

  login(formValues) {
    this.authService.loginUser(formValues.userName, formValues.password).subscribe(response => {
      if (!response) {
        this.loginInvalid = true
      } else {
        console.log(response)
        this.authService.currentUser = {
          uid: response.current_user.uid,
          userName: response.current_user.name,
          csrfToken: response.csrf_token,
          logoutToken: response.logout_token,
          password: formValues.password
        }

        this.cookie.set('userCredentials', JSON.stringify(this.authService.currentUser))
        console.log(this.cookie.get('userCredentials'))
        this.router.navigate(['tasks'])
      }
    })
  }

  cancel() {
    this.router.navigate(['tasks'])
  }
}
