import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-I';
  sessionId: any
  cookieValue: string

  constructor(private auth: AuthService, private http: HttpClient, private cookie: CookieService) { }

  ngOnInit() {
    this.cookieValue = this.cookie.get('userCredentials')
    console.log(this.cookieValue)
    this.auth.checkAuthenticationStatus();
  }
}
