import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IUser } from '../user/common/IUser.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser: IUser
  loggedUser: IUser
  sessionId: any
  userData: any
  cookieValue = this.cookie.get('userCredentials')

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getSessionId() {
    return this.http.get('http://localhost/ng-test/session/token', {
      responseType: 'text'
    })
  }

  loginUser(userName: string, password: string): Observable<any> {
    let usr = {
      "name": userName,
      "pass": password
    }

    let options = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json',
          'withCredentials': 'true',
          'observe': 'response'
        }
      )
    }
    return this.http.post('http://localhost/ng-test/user/login?_format=hal_json', usr, options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data
      }))
      .pipe(catchError(
        err => {
          return of(false)
        }))
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    if (this.cookieValue) {
      let userObject = this.cookieValue ? !isNaN : JSON.parse(this.cookieValue)
      if (userObject != null) {
        console.log('Checking for userObject value is null')
        this.currentUser = {
          uid: +userObject.uid,
          userName: userObject.userName,
          csrfToken: userObject.csrfToken,
          logoutToken: userObject.logoutToken,
          password: userObject.password
        }
      }
    } else {
      console.log('Checking for cookie value(else)')
      this.currentUser = null
    }
  }

  logoutUser() {
    let userObject = JSON.parse(this.cookie.get('userCredentials'))
    this.loggedUser = {
      uid: +userObject.uid,
      userName: userObject.userName,
      csrfToken: userObject.csrfToken,
      logoutToken: userObject.logoutToken,
      password: userObject.password
    }
    console.log(this.loggedUser)
    let usr = btoa(this.loggedUser.userName + ":" + this.loggedUser.password)
    let usrDetail = {
      "name": userObject.userName,
      "pass": userObject.password
    }
    let header_options = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json',
          'accept': 'application/json',
          'X-CSRF-Token': this.loggedUser.csrfToken,
          'withCredentials': 'true',
          'Authorization': 'Basic ' + usr
        }
      )
    }

    this.http.post('http://localhost/ng-test/user/logout?_format=json&token=' + this.loggedUser.logoutToken, usrDetail, header_options).subscribe(data => console.log(data))
    this.currentUser = null
    this.cookie.deleteAll()
  }

  private handleError<T>(opertaion = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }
}
